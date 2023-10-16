import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LoginAtom} from '../../type/allTypes';
import { useRecoilState} from 'recoil';
import { useEffect } from 'react';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background: #1a1a1a;
  align-items: center;
  justify-content:space-between;
  color: #fff;
  #logo{
    margin-left:1rem;
    height: 40px;
  }
  button{
    margin-right:1rem;
    outline: none;
    -webkit-appearance: none;
    &:hover{border: 1px solid transparent; color: royalblue}
  }
`
const SignOutStyle = styled.div`
  display:inline-flex;
  align-items: center;
  span{
    display:inline-flex;
    align-items: center;
    font-size: 0.875rem;
  em{display: inline-block; margin-left: 0.25rem; color:#7c9af2; line-height:100%; font-style: normal; vertical-align: middle}
  }
`
const Header = () => {
  const [Data, setData ]= useRecoilState(LoginAtom);

  const navigate = useNavigate();
  const fnGotoLogin = () =>{
    navigate('/login');
  }
  const fnSignOut = ()=>{
    setData( { userId: '', userPw: '', saveId: false })
    localStorage.clear();
    //로그아웃 후   ,그 자리에 그대로 머물게 한다
  }
  const fnGoHome = () =>{
    navigate('/list');
  }
  const storageUserId = localStorage.getItem("userId") as string;
  useEffect( () => {
    localStorage.getItem("userId");
  }, [ Data ] );

  return (
    <HeaderStyle className={`header`}>
      <img src="/src/assets/logo-hori.png" alt="Pokemon Logo" id="logo" onClick={fnGoHome}/>
      {storageUserId?
        <SignOutStyle className={`signout`}>
          <span>Welcome! <em>{storageUserId}</em></span>
          <button onClick={()=> fnSignOut()}>Sign Out</button>
        </SignOutStyle>
      :
        <button onClick={()=>fnGotoLogin()}>Sign In</button>
      }
    </HeaderStyle>
  );
};

export default Header;