interface User {
  account: string;
  name: string;
  email: string;
  phone: string;
}

export default interface UserState {
  user: User[] | undefined;
  language: string;
}
