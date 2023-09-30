import { getAuth } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "routes/routes.enum";

const AuthProvider: React.FC = () => {
  const { currentUser } = getAuth();

  if (currentUser) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTES.AUTH} />;
  }
};

export default AuthProvider;
