import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import AddContacts from "../pages/AddContacts";
import AllContacts from "../pages/AllContact";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-contacts",
    element: <AddContacts />,
  },
  {
    path: "/all-contacts",
    element: <AllContacts />,
  },
]);

export default router;
