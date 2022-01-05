import Err from "../Pages/err";
import Home from "../Pages/Home/Home";
import Movie from "../Pages/Movies/Movie";
import Subitem from "../Pages/Subs/SubItem";
import Subs from "../Pages/Subs/Subs";
import Users from "../Pages/Users/Users";
import UserEdit from "../Pages/Users/UserEdit";
import Movieedit from "../Pages/Movies/MovieEdit";

export const routes = [
  {
    path: "/dashboard",
    element: <Home />,
  },
  {
    path: "/subs/list",
    element: <Subs />,
  },
  {
    path: "/subs/list/id",
    element: <Subitem />,
  },
  {
    path: "/users/list/id",
    element: <UserEdit/>,
  },
  {
    path: "/movie/list/id",
    element: <Movieedit/>,
  },
  {
    path: "/users/list",
    element: <Users />,
  },
  {
    path: "/movie/list",
    element: <Movie />,
  },
  {
    path: "*",
    element: <Err />,
  },
];
