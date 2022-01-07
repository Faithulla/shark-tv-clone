import Err from "../Pages/err";
import Home from "../Pages/Home/Home";
import Movie from "../Pages/Movies/Movie";
import SubItem from "../Pages/Subs/SubItem";
import Subs from "../Pages/Subs/Subs";
import Users from "../Pages/Users/Users";
import UserEdit from "../Pages/Users/UserEdit";
import MovieEdit from "../Pages/Movies/MovieEdit";

export const routes = [
  {
    path: "/dashboard",
    element: <Home />,
    key: 1,
  },
  {
    path: "/subs/list",
    element: <Subs />,
    key: 2,
  },
  {
    path: "/subs/list/:id",
    element: <SubItem />,
    key: 3,
  },
  {
    path: "/users/list/:id",
    element: <UserEdit />,
    key: 4,
  },
  {
    path: "/movie/list/:id",
    element: <MovieEdit />,
    key: 5,
  },
  {
    path: "/users/list",
    element: <Users />,
    key: 6,
  },
  {
    path: "/movie/list",
    element: <Movie />,
    key: 7,
  },
  {
    path: "*",
    element: <Err />,
    key: 8,
  },
];
