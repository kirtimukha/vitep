const Login = () => {
  const onChangeId = () => {}
  const onChangePw = () => {}
  return (
    <>
      <input type="text" id="inputID" value={``} onChange={onChangeId}/>
      <input type="password"  id="inputPW" value={``} onChange={onChangePw}/>
      <button>Login</button>
    </>
  );
};

export default Login;