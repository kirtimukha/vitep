import {useForm} from 'react-hook-form';
import { useState } from 'react';
const Login = () => {

/*  const [IsLogin, setIsLogin] = useRecoilState(loginAtom)
  const onChangeId = () => {}*/


  const [Data, setData] = useState({});
  const fnLogin= () => {

  }
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit((Data) => setData(JSON.stringify(Data)))}>
      <label htmlFor={`inputID`} >User Name</label>
      <input type="text" id="inputID" placeholder={`5자 이상 영문`} {...register("inputID", {required: true})} />
      <label htmlFor={`inputPW`} >Password</label>
      <input type="password"  id="inputPW" value={``} placeholder={`영문, 숫자, 특수문자 혼합 8자 이상`} {...register("inputPW", {required: true})} />
      <button type="submit" onClick={()=> fnLogin()}>Login</button>
    </form>
  );
};

export default Login;