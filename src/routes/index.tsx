import { Auth, Chat } from "pages";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes.enum";

export const router = createBrowserRouter([
  {
    path: ROUTES.CHAT,
    element: <Chat />,
    children: [
      {
        path: ROUTES.CHAT,
        element: <Chat />,
      },
    ],
  },

  {
    path: ROUTES.AUTH,
    element: <Auth />,
  },
]);
