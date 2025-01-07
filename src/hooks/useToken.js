import { setLogin, setLogOut } from "../actions/login";
import { refreshToken } from "../services/authService";
import { delete_cookie, getCookie, setCookie } from "../helpers/cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const useToken = () => {
  const isLogin = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Date.now() - parseInt(getCookie("expireT")) >= 1 * 1000) {
      return;
    }
    if (getCookie("refreshToken")) {
      setTimeout(async () => {
        console.log("get access Token");
        try {
          const result = await refreshToken(getCookie("refreshToken"));
          setCookie("accessToken", result.accessToken, 1 / 60 / 60 / 24);
          setCookie("expireT", Date.now(), 1 / 60 / 60 / 24);
          dispatch(setLogin());
        } catch (err) {
          console.error(err);
          delete_cookie("accessToken");
          delete_cookie("refreshToken");
          dispatch(setLogin());
        }
      }, 1 * 1000 - (Date.now() - parseInt(getCookie("expireT"))));
    }
  }, [isLogin]);
};
