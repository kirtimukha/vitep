
import './App.css'
import { lazy } from "react";
import { Route, Routes} from "react-router-dom";

const List = lazy(() => import("./view/List"));
const Detail = lazy(() => import("./view/Detail"));


function App() {

  return (
    <Routes>
      <Route path={"/"} element={<List />} />
      <Route path={`/detail/:id`} element={<Detail />} />
    </Routes>

  )
}

export default App
