import LoginTemp from "../components/core/Auth/LoginTemp";

const Login = () => {
  return (
    <LoginTemp
      image={"/assets/Images/login.webp"}
      frame={"/assets/Images/frame.png"}
      title={"Welcome back,"}
      description={"Build skills for today, tomorrow, and beyond."}
    />
  );
};

export default Login;
