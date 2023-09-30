import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "utils/firebase";

const useAuth = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const authListen = onAuthStateChanged(auth, (user) =>
      user ? setUser(true) : setUser(false)
    );

    return () => {
      authListen();
    };
  }, []);

  return user;
};

export default useAuth;
