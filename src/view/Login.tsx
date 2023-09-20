import {useForm} from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ILoginAuth } from '../type/allTypes';
import styled from 'styled-components';
const InputStyle = styled.input`
  margin-top: 0.125rem;
  background: white;
  border: 1px solid rgb(204, 210, 220);
  border-radius: 0.4rem;
  padding: 0.75rem;
  outline: none;
  -webkit-appearance: none;
  &:focus{border-color: royalblue}
  color: royalblue;
`
const LogoStyle = styled.img`
  width: 300px;
  margin:0 auto 20px;
`

const BtnLongStyle = styled.button`
  width: 100%;
  background: royalblue;
  color:#fff;
  padding: 0.75rem;
`
const Login = () => {

  const [Data, setData] = useState({});
  const fnLogin= () => {

  }
  const {register, handleSubmit, formState:{errors}, setError} = useForm<ILoginAuth>({mode: 'onBlur'});

  return (
    <form onSubmit={handleSubmit((Data) => setData(JSON.stringify(Data)))}>
      <div className="wrap-membership">
        <div className="row column text-center">
          <LogoStyle src="/src/assets/logo-hori.png" alt="pokemon Logo"/>
        </div>
        <div className="row column">
          <label htmlFor={`userId`} >User Name</label>
          <InputStyle type="text" id="userId" placeholder={`5자 ~ 20자, 영문 또는 숫자`} {...register("userId", {required: true, minLength: { value: 5, message: "5자 이상 입력해 주세요."} , maxLength: { value:20, message: "20자 이내로 입력해 주세요." }, pattern: {value: /^[A-Za-z]+$/i, message: "영문 대소문자 및 숫자만 입력 가능합니다." }})} />
          <p>{errors?.userId?.message}</p>
        </div>
        <div className="row column">
          <label htmlFor={`inputPW`} >Password</label>
          <InputStyle type="password"  id="userPw"  placeholder={`영문, 숫자, 특수문자 혼합 8자 ~ 20자 이내상`} {...register("userPw", {minLength: 8, maxLength: 20, required: true})} />
          <p>{errors?.userPw?.message}</p>
        </div>
        <div className="row between">
          <span className="wrap-checkbox">
            <input type="checkbox" id={`saveId`} {...register("saveId", {required: false})} />
            <label htmlFor="saveId">Save ID</label>
          </span>
          <span className={`forgot-pw`} style={{color:"royalblue"}}>
            Forgot Password?
          </span>
        </div>
        <div className="row text-center">
          <BtnLongStyle type="submit" onClick={()=> fnLogin()}>Sign in</BtnLongStyle>
        </div>
        <div className="row mt2 mb0 text-center new-member">
          New to Poktmon?&nbsp;&nbsp;<Link to={`/signup`}>Create an account</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;