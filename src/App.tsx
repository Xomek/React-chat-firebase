import { Auth, Chat } from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./api";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const authListen = onAuthStateChanged(auth, (user) =>
      user ? setUser(user) : setUser(null)
    );

    return () => {
      authListen();
    };
  }, []);

  return <div className="app">{user ? <Chat /> : <Auth />}</div>;
}

export default App;
