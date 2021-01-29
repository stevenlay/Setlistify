import { combineReducers } from "redux";
import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
import searchDetailsReducer from "./searchDetailsReducer";
import cookieReducer from "./cookieReducer";
import playlistReducer from "./playlistReducer";

export default combineReducers({
  auth: authReducer,
  expired: cookieReducer,
  search: searchReducer,
  searchDetails: searchDetailsReducer,
  playlist: playlistReducer,
});
