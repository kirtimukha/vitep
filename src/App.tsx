import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from "react";

import './App.scss'

const List = lazy(() => import("./view/List"));
const Detail = lazy(() => import("./view/Detail"));
const Login = lazy(() => import("./view/Login"));


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Suspense fallback={<div>Loading...</div>}> <List /></Suspense>} />
      <Route path={`/detail/:id`} element={<Suspense fallback={<div>Loading...</div>}> <Detail /></Suspense>} />
      <Route path={`/login`} element={<Suspense fallback={<div>Loading...</div>}> <Login /></Suspense>} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
