import { useAuthType } from "./useAuthType";
import { Button, TextField } from "components/UI";
import { CircularProgress } from "components/UI";
import styles from "./Auth.module.css";

const Auth: React.FC = () => {
  const {
    state,
    isLoginType,
    handleAuthType,
    handleSubmit,
    handleChange,
    loading,
    handleFile
  } = useAuthType();

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
