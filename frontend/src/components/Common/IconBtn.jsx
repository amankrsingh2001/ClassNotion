const IconBtn = ({ text, onclick, children, outline = false, customClasses = "", type, disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onclick}
      className={`btn ${outline ? "btn-glass" : "btn-primary"} ${customClasses}`}
    >
      {children ? <>{children}</> : text}
    </button>
  );
};

export default IconBtn;
