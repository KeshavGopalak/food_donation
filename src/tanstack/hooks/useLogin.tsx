import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authServices";
type LoginPayload = {
    email: string;
    password: string;
};
export const useLogin = () => {
  return useMutation({
        mutationFn: (credentials: LoginPayload) =>
            authService.login(credentials),
    });
}