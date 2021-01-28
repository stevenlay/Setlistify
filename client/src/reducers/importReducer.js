import { IMPORT_SETLIST } from "../actions/types";

const importReducer = (state = null, action) => {
  switch (action.type) {
    case IMPORT_SETLIST:
      return action.payload || false;

    default:
      return state;
  }
};

export default importReducer;
