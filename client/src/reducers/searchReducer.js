import { FETCH_ARTIST } from "../actions/types";
const searchReducer = (state = false, action) => {
  switch (action.type) {
    case FETCH_ARTIST:
      return action.payload || false;

    default:
      return state;
  }
};

export default searchReducer;
