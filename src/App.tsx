import { Route, Routes} from "react-router-dom";
import { lazy } from "react";

import './App.scss'

const List = lazy(() => import("./view/List"));
const Detail = lazy(() => import("./view/Detail"));
const Login = lazy(() => import("./view/Login"));


function App() {

  return (
    <Routes>
      <Route path={"/"} element={<List />} />
      <Route path={`/detail/:id`} element={<Detail />} />
      <Route path={`/login`} element={<Login />} />
    </Routes>

  )
}

export default App
