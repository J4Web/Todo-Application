import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useIsLogged = (): boolean => {
  const [isLogged, setIsLogged] = useState<boolean>(
    !!Cookies.get("auth_token")
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsLogged(!!Cookies.get("auth_token"));
    };

    checkAuth();

    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  return isLogged;
};

export default useIsLogged;
