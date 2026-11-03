import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import { donationService, DonationInput } from '../services/donationServices';

export const useDonation = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (donation: DonationInput) => {
      if (!token) {
        throw new Error('You must sign in before posting a donation.');
      }

      return donationService.postDonations(token, donation);
    },
  });
};