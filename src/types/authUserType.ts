export interface CreateUserType {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface LoginUserType {
  email: string;
  password: string;
}
