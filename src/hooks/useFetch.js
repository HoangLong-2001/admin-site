import { useReducer } from "react";

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        type: "SUCCESS",
        data: action.data,
        failure: null,
      };
    case "FAILURE":
      return {
        type: "FAIL",
        data: null,
        failure: true,
      };
  }
  return state;
};

export default function useFetch(params, url, callback) {
  const [data, dispatch] = useReducer(fetchReducer, null);
}
