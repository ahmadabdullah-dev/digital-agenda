export type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  role: string;
  imageUrl: string | null;
};