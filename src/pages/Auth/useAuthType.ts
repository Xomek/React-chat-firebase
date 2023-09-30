import { useState } from "react";
import { AuthForm, AuthType, AuthValidation } from "./Auth.types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "utils/firebase";
import { authSchema } from "./Auth.schema";
import { ValidationError } from "yup";

export const useAuthType = () => {
  const [state, setState] = useState<AuthForm>({
    email: "",
    password: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErorrs] = useState<Record<string, any> | null>(null);

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

    authSchema
      .validate(state, { abortEarly: false })
      .then(() => {
        setErorrs(null);
      })
      .catch((err: ValidationError) => {
        const newErrors = {} as any;

        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });

        setErorrs(newErrors);
      });

    if (!errors) {
      setLoading(true);

      isLoginType
        ? signInWithEmailAndPassword(auth, state.email, state.password).finally(
            () => setLoading(false)
          )
        : createUserWithEmailAndPassword(auth, state.email, state.password)
            .then((data) => {
              if (file) {
                const storageRef = ref(storage, `images/${data.user.uid}`);
                uploadBytes(storageRef, file);
              }
            })
            .finally(() => setLoading(false));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  return {
    state,
    isLoginType,
    handleAuthType,
    handleSubmit,
    loading,
    errors,
    handleChange,
    handleFile,
  };
};
