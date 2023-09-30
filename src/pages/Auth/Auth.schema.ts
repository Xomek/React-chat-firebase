import * as yup from "yup";

export const authSchema = yup.object().shape({
  email: yup.string().email().required("Обязательное поле"),
  password: yup.string().min(6).required("Обязательное поле"),
});
