import { requestJson } from './authServices';

export type ProfileUpdate = {
  name?: string;
  email?: string;
  avatar?: string;
};

export const profileService = {
  getProfile: (token: string): Promise<unknown> =>
    requestJson('/api/dashboard/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateProfile: (token: string, profile: ProfileUpdate): Promise<unknown> =>
    requestJson('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    }),
};
