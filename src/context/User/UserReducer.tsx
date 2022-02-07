const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CREATE_USER_CONSUMER":
      return {
        ...state,
        user: action.payload,
      };
  }
};

export default userReducer;
