import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../auth/AuthContext';
import {
  donationService,
  DonationInput,
  getDonationOwner,
} from '../services/donationServices';
import { profileService } from '../services/profileServices';

export const useDonation = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (donation: DonationInput) => {
      if (!token) {
        throw new Error('You must sign in before posting a donation.');
      }

      const profile = await profileService.getProfile(token);
      const owner = getDonationOwner(profile);
      return donationService.postDonation(token, donation, owner);
    },
  });
};