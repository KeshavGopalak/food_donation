type LoginPayload = {
  email: string;
  password: string;
};

export type RegistrationPayload = {
  name: string;
  email: string;
  password: string;
  role: 'Donor' | 'Volunteer';
};

const API_BASE_URL = 'https://food-donation-be.onrender.com';
const REQUEST_TIMEOUT_MS = 60_000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const nestedRecords = (value: unknown): Record<string, unknown>[] => {
  if (!isRecord(value)) {
    return [];
  }

  const records = [value];
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    for (const key of ['data', 'user', 'profile', 'account']) {
      const nested = record[key];
      if (isRecord(nested) && !records.includes(nested)) {
        records.push(nested);
      }
    }
  }
  return records;
};

export const getAuthToken = (response: unknown): string | null => {
  for (const record of nestedRecords(response)) {
    const token =
      record.token ?? record.accessToken ?? record.access_token;
    if (typeof token === 'string' && token.trim().length > 0) {
      return token;
    }
  }
  return null;
};

export type AccountRole = 'volunteer' | 'donor' | null;
export type VolunteerReviewState =
  | 'pending'
  | 'approved'
  | 'unknown'
  | 'not-volunteer';

export const getAccountRole = (profile: unknown): AccountRole => {
  for (const record of nestedRecords(profile)) {
    const role = Object.entries(record).find(
      ([key]) => key.toLowerCase() === 'role',
    )?.[1];
    if (typeof role === 'string') {
      const normalizedRole = role.trim().toLowerCase();
      if (normalizedRole.includes('volunteer')) {
        return 'volunteer';
      }
      if (
        normalizedRole.includes('donor') ||
        normalizedRole === 'user'
      ) {
        return 'donor';
      }
    }
  }
  return null;
};

export const getVolunteerReviewState = (
  profile: unknown,
): VolunteerReviewState => {
  if (getAccountRole(profile) !== 'volunteer') {
    return 'not-volunteer';
  }

  const records = nestedRecords(profile);
  const statusFields = ['status', 'accountStatus', 'verificationStatus'];
  const booleanFields = [
    'verified',
    'isVerified',
    'active',
    'isActive',
    'approved',
    'isApproved',
    ...statusFields,
  ];
  let hasApprovalSignal = false;

  for (const record of records) {
    for (const [key, value] of Object.entries(record)) {
      const normalizedKey = key.toLowerCase();
      if (
        statusFields.some(field => field.toLowerCase() === normalizedKey) &&
        typeof value === 'string'
      ) {
        const status = value.trim().toLowerCase();
        if (
          [
            'pending',
            'inactive',
            'disabled',
            'suspended',
            'rejected',
            'unverified',
            'not verified',
            'not-verified',
            'false',
          ].includes(status)
        ) {
          return 'pending';
        }
        if (['active', 'approved', 'verified', 'accepted'].includes(status)) {
          hasApprovalSignal = true;
        }
      }

      if (booleanFields.some(field => field.toLowerCase() === normalizedKey)) {
        if (
          value === false ||
          (typeof value === 'string' && value.toLowerCase() === 'false')
        ) {
          return 'pending';
        }
        if (
          value === true ||
          (typeof value === 'string' && value.toLowerCase() === 'true')
        ) {
          hasApprovalSignal = true;
        }
      }
    }
  }

  return hasApprovalSignal ? 'approved' : 'unknown';
};

export async function requestJson(
  path: string,
  options: RequestInit = {},
): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    let response: Response;
    try {
      response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        signal: controller.signal,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(
          'The server is taking longer than expected to respond. Please try again.',
        );
      }
      if (error instanceof TypeError) {
        throw new Error(
          'Unable to connect to the server. Check your connection and try again.',
        );
      }
      throw error;
    }

    const responseText = await response.text();
    let result: unknown = null;
    if (responseText.trim()) {
      try {
        result = JSON.parse(responseText);
      } catch {
        if (response.ok) {
          throw new Error('The server returned an invalid response.');
        }
      }
    }

    if (!response.ok) {
      const errorRecord = nestedRecords(result)[0];
      const message =
        typeof errorRecord?.message === 'string'
          ? errorRecord.message
          : typeof errorRecord?.error === 'string'
            ? errorRecord.error
            : response.status === 401
              ? 'Incorrect email or password. Please try again.'
              : `Request failed (${response.status}).`;
      throw new Error(message);
    }

    return result;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(
        'The server is taking longer than expected to respond. Please try again.',
      );
    }
    if (error instanceof TypeError) {
      throw new Error(
        'Unable to connect to the server. Check your connection and try again.',
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const authService = {
  login: (credentials: LoginPayload): Promise<unknown> =>
    requestJson('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }),

  register: (registration: RegistrationPayload): Promise<unknown> =>
    requestJson('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registration),
    }),
};
