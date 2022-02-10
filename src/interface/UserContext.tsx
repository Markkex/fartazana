export default interface InitialState {
  user: any;
}
export type Action = {
  type: "GET_USER";
  payload: any;
};

export interface InputProviderProps {
  children: React.ReactNode;
}
