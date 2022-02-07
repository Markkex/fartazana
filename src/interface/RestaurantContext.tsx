export default interface InitialState {
  restaurant: any;
}

export type Action = { type: "CREATE_RESTAURANT"; payload: any };

export interface InputProviderProps {
  children: React.ReactNode;
}
