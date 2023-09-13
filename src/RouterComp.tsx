import { lazy } from "react";
import { Route, Routes} from "react-router-dom";

const List = lazy(() => import("./view/List"));
const Detail = lazy(() => import("./view/Detail"));


const RouterComp = () => {
  return (
      <Routes>
        <Route path={"/"} element={<List />} />
        <Route path={`/detail`} element={<Detail />} />
      </Routes>
  );
};

export default RouterComp;

