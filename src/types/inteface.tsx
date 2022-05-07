interface User {
  account: string;
  name: string;
  email: string;
  phone: string;
}

interface Restaurants {
  account: string;
  address: string;
  email: string;
  establishmentName: string;
  location: string;
  name: string;
  phone: string;
}

export default interface ReduxState {
  user?: User[] | undefined;
  language?: string;
  restaurants?: Restaurants[] | undefined;
}
