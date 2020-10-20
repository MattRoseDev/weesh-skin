import queryString from "query-string";
import storage from "./storage";

export default ({ location, param }) => {
  if (location.search.length > 0) {
    let value = queryString.parse(location.search)[`${param}`];
    if (value) {
      storage.set({ key: param, value });
    }
  }
};
