import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appWrite";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
          console.log("User >>> ", res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        setUser,
        setIsLoggedIn,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
