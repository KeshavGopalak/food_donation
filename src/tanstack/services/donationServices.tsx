export type DonationInput = {
  foodType: string;
  itemName: string;
  quantity: number;
  expiry: string;
  location: string;
};

export const donationService = {
  postDonations: async (token: string, donation: DonationInput) => {
    const response = await fetch(
      'https://food-donation-be.onrender.com/api/donations/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donation),
      },
    );

    const result = await response.json().catch(() => null);
    if (!response.ok) {
      const message =
        result && typeof result.message === 'string'
          ? result.message
          : `Failed to create donation (${response.status})`;
      throw new Error(message);
    }

    return result;
  },
};
