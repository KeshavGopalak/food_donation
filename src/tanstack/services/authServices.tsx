type LoginPayload = {
    email: string;
    password: string;
};
export const authService = {
  login: async (credentials: LoginPayload) => {
    try {
      const response = await fetch(
        'https://food-donation-be.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          errorData?.message || `Login failed: ${response.status}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
};

export const fetchUserData = async (token: string) => {
  try {
    const response = await fetch(
      'https://food-donation-be.onrender.com/api/user/profile',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};