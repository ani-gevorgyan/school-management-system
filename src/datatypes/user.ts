export type UserRegistrationData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserRegistrationResponse = {
  id: string;
  email: string;
};

export type UserLoginData = {
  email: string;
  password: string;
};
