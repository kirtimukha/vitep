import { lazy } from "react";
import { Route, Routes} from "react-router-dom";
import './App.css'

const RouterDefine = () => {
  const Login = lazy(() => import("./view/List"));
  const List = lazy(() => import("./view/Login"));
  const Detail = lazy(() => import("./view/Detail"));

    return (
      <Routes>
        <Route path={"/"} element={<List />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={`/detail/:id`} element={<Detail />} />
      </Routes>
    )
  }

export default RouterDefine;