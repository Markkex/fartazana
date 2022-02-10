const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
  }
};

export default userReducer;
