export const profileService = {
  getProfile: async (token: string) => {
    const response = await fetch(
      'https://food-donation-be.onrender.com/api/dashboard/user',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch profile (${response.status})`);
    }

    return response.json();
  },
};
