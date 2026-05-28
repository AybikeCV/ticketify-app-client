import service from "../services/index.services";
import { createContext, useEffect, useState } from "react";


const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);

  const [loggedUserRole, setLoggedUserRole] = useState(null);

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [loggedUserName, setLoggedUserName] = useState(null);

  const authenticateUser = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setIsAuthenticating(false);
      return; // in case there is no token, don't call the backend
    }

    try {
      const response = await service.get("/auth/verify");
      console.log(response);

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setLoggedUserRole(response.data.payload.role);
      setLoggedUserName(response.data.payload.name);

      setIsAuthenticating(false);
    } catch (error) {
      console.log(error);
    
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setLoggedUserRole(null);

      setIsAuthenticating(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authToken");

    setIsLoggedIn(false);

    setLoggedUserId(null);

    setLoggedUserRole(null);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (isAuthenticating) {
    return (
      <h3 className="text-center py-20 text-zinc-400">
        Authenticating user...
      </h3>
    );
  }

  const passedContext = {
    isLoggedIn,
    setIsLoggedIn,
    loggedUserId,
    setLoggedUserId,
    loggedUserRole,
    setLoggedUserRole,
    logoutUser,
    loggedUserName,
    setLoggedUserName,
  };

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
