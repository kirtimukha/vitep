import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginAtom } from '../../type/allTypes';
import { useRecoilState } from 'recoil';

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
  }
`
const Header = () => {
  
  const [IsLogin, setIsLogin ]= useRecoilState(loginAtom);
  const navigate = useNavigate();
  const fnGotoLogin = () =>{
    navigate('/login');
  }
  const fnSignOut = ()=>{
    setIsLogin(false)
    //로그아웃 후 그 자리에 그대로 머물게 한다
  }
  const fnGoHome = () =>{
    navigate('/list');
  }
  return (
    <HeaderStyle className={`header`}>
      <img src="src/assets/logo-hori.png" alt="Pokemon Logo" id="logo" onClick={fnGoHome}/>
      {IsLogin?
        <button onClick={()=> fnSignOut()}>Sign Out</button>
      :
        <button onClick={()=>fnGotoLogin()}>Sign In</button>
      }
    </HeaderStyle>
  );
};

export default Header;