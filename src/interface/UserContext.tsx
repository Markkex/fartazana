export default interface InitialState {
  user: any;
}
export type Action = {
  type: "CREATE_USER_CONSUMER";
  payload: any;
};

export interface InputProviderProps {
  children: React.ReactNode;
}
