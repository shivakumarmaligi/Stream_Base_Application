import {
  onAuthStateChanged,
  reauthenticateWithPhoneNumber,
} from "firebase/auth";
import { auth } from "./firebase";
import { createContext, useState, useEffect } from "react";

export let AuthContext = createContext();
let AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, userInfo => {
      if (
        (userInfo && userInfo.emailVerified === true) ||
        reauthenticateWithPhoneNumber
      ) {
        let token = userInfo.accessToken;
        window.sessionStorage.setItem("TOKEN", token);
        setUser(userInfo);
      } else {
        setUser(null);
      }
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
