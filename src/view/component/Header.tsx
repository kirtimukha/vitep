import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loginAtom } from '../../type/allTypes';
import { useRecoilState } from 'recoil';

const HeaderStyle = styled.div`
  width: 100%;
  height: 60px;
  background: #1a1a1a;
  color: ${props => props.theme.gray100}
  
`
const Header = () => {
  /*const location = useLocation();*/
  const [IsLogin, setIsLogin ]= useRecoilState(loginAtom);
  const navigate = useNavigate();
  const fnGotoLogin = () =>{
    navigate('/login');
  }
  const fnSignOut = ()=>{
    setIsLogin(false)
    //로그아웃 후 그 자리에 그대로 머물게 한다
  }
  return (
    <HeaderStyle className={`header`}>
      {IsLogin?
        <button onClick={()=> fnSignOut()}>Sign Out</button>
      :
        <button onClick={()=>fnGotoLogin()}>Sign In</button>
      }
    </HeaderStyle>
  );
};

export default Header;