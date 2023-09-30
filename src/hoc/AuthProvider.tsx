import useAuth from "hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "routes/routes.enum";

const AuthProvider: React.FC = () => {
  const auth = useAuth();
  
  if (auth) {
    return <Outlet />;
  } else {
    return <Navigate to={ROUTES.AUTH} />;
  }
};

export default AuthProvider;
