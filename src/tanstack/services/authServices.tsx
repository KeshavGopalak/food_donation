type LoginPayload = {
  email: string;
  password: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const getAuthToken = (response: unknown): string | null => {
  if (!isRecord(response)) {
    return null;
  }

  const nestedData = isRecord(response.data) ? response.data : null;
  const token =
    response.token ??
    response.accessToken ??
    response.access_token ??
    nestedData?.token ??
    nestedData?.accessToken ??
    nestedData?.access_token;

  return typeof token === 'string' && token.trim().length > 0
    ? token
    : null;
};

export const authService = {
  login: async (credentials: LoginPayload): Promise<unknown> => {
    const response = await fetch(
      'https://food-donation-be.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      },
    );

    const result = await response.json().catch(() => null);
    if (!response.ok) {
      const message =
        isRecord(result) && typeof result.message === 'string'
          ? result.message
          : `Login failed (${response.status})`;
      throw new Error(message);
    }

    return result;
  },
};

export const fetchUserData = async (token: string) => {
  const response = await fetch(
    'https://food-donation-be.onrender.com/api/user/profile',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user data (${response.status})`);
  }

  return response.json();
};
