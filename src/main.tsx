import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import "./styles/index.css";

const app = (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(app);
