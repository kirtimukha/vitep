import styled from "styled-components";
import List from './List';
const WrapperStyle = styled.div`
  margin:0;padding:0
  
`
const Layout = () => {
  return (
    <WrapperStyle id={`Wrapper`}>
      <List />
    </WrapperStyle>
  );
};

export default Layout;