export type UserDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  role: string;
  imageUrl: string | null;
};
export type UpdateUserDto = {
  firstName: string | null;
  lastName: string | null;
  image: File | null;
};
export type RequestUpdateCurrentEmailDto = {
  newEmail: string;
};

export type UpdateCurrentEmailDto = {
  code: string;
};