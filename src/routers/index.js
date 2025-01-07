import LayoutDefault from "../layout/LayoutDefault";
import Account from "../pages/Account";
import Login from "../pages/Login";
import Order from "../pages/Order";
import Product from "../pages/Product";
import Staff from "../pages/Staff";

export const routes = [
  {
    path:'/',
    element: <LayoutDefault />,
    children: [
      {
        index:true,
        element: <Product />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
  { path: "login", element: <Login /> },
];
