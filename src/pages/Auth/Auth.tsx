import { useAuthType } from "./useAuthType";
import { Button, TextField } from "../../components/UI";
import { CircularProgress } from "../../components/UI";
import { storage } from "../../api";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import styles from "./Auth.module.css";

const Auth: React.FC = () => {
  const {
    state,
    isLoginType,
    handleAuthType,
    handleSubmit,
    handleChange,
    loading,
  } = useAuthType();

  const storageRef = ref(storage, "images");

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) uploadBytes(storageRef, file);
  }, [file]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>{isLoginType ? "Вход" : "Регистрация"}</h1>
        <TextField
          type="text"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Почта"
        />
        <TextField
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Пароль"
        />

        {!isLoginType && <input type="file" onChange={handleFile} />}

        <Button className={styles.button} type="submit">
          {loading ? (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          ) : isLoginType ? (
            "Войти"
          ) : (
            "Зарегистрироваться"
          )}
        </Button>
        <Button
          className={styles.button}
          type="button"
          onClick={handleAuthType}
        >
          {isLoginType ? "У меня нет аккаунта" : "У меня уже есть аккаунт"}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
