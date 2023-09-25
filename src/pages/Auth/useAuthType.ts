import { useState } from "react";
import { AuthForm, AuthType } from "./Auth.types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../api";

export const useAuthType = () => {
  const [state, setState] = useState<AuthForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [type, setType] = useState<AuthType>("login");
  const isLoginType = type === "login";

  const handleAuthType = () => {
    if (isLoginType) {
      setType("registration");
    } else {
      setType("login");
    }

    setState({ email: "", password: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    isLoginType
      ? signInWithEmailAndPassword(auth, state.email, state.password).finally(
          () => setLoading(false)
        )
      : createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        ).finally(() => setLoading(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    state,
    isLoginType,
    handleAuthType,
    handleSubmit,
    loading,
    handleChange,
  };
};
