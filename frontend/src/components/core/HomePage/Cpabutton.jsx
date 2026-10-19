import { Link } from "react-router-dom";

const Cpabutton = ({ children, active, linkto = "#", data, background = "btn-primary", inActiveBackground = "btn-glass" }) => {
  return (
    <Link to={linkto} onClick={data} className={`btn btn-lg ${active ? background : inActiveBackground}`}>
      {children}
    </Link>
  );
};

export default Cpabutton;
