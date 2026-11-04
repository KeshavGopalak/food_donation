import { requestJson } from './authServices';

export type DonationInput = {
  foodType: string;
  itemName: string;
  quantity: number;
  expiryWindow: string;
  pickupLocation: string;
  photoUrl?: string;
  description?: string;
};

export type DonationOwner = {
  donorId: string;
  donorName: string;
  donorEmail: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

function getProfileRecords(profile: unknown): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];
  const queue: unknown[] = [profile];
  const visited = new Set<object>();

  while (queue.length) {
    const current = queue.shift();
    if (Array.isArray(current)) {
      queue.push(...current);
    } else if (isRecord(current) && !visited.has(current)) {
      visited.add(current);
      records.push(current);
      for (const key of ['data', 'user', 'profile', 'account']) {
        if (current[key] !== undefined) {
          queue.push(current[key]);
        }
      }
    }
  }

  return records;
}

function findProfileString(
  records: Record<string, unknown>[],
  fields: string[],
): string | undefined {
  for (const record of records) {
    for (const field of fields) {
      const value = Object.entries(record).find(
        ([key]) => key.toLowerCase() === field.toLowerCase(),
      )?.[1];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
  }

  return undefined;
}

function findProfileId(records: Record<string, unknown>[]): string | undefined {
  const fields = ['_id', 'id', 'userId', 'donorId'];
  for (const record of records) {
    const value = Object.entries(record).find(([key]) =>
      fields.some(field => key.toLowerCase() === field.toLowerCase()),
    )?.[1];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return String(value);
    }
  }
  return undefined;
}

export function getDonationOwner(profile: unknown): DonationOwner {
  const records = getProfileRecords(profile);
  const donorId = findProfileId(records);
  const donorName = findProfileString(records, [
    'name',
    'fullName',
    'organizationName',
  ]);
  const donorEmail = findProfileString(records, ['email']);

  if (!donorId || !donorName || !donorEmail) {
    throw new Error(
      'Your profile is missing donor details. Refresh your profile and try again.',
    );
  }

  return { donorId, donorName, donorEmail };
}

export const donationService = {
  getDonationsByDonor: (token: string, donorId: string): Promise<unknown> =>
    requestJson(`/api/donations/donor/${encodeURIComponent(donorId)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  postDonation: (
    token: string,
    donation: DonationInput,
    owner: DonationOwner,
  ): Promise<unknown> =>
    requestJson('/api/donations/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...donation, ...owner }),
    }),
};
