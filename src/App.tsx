import { Auth, Chat } from "./pages";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "utils/firebase";

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
