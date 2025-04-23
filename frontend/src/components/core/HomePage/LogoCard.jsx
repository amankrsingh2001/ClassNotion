import React from "react";

export const LogoCard = ({ index, description, name, logo }) => {
  return (
    <>
      <div className="flex items-center ">
        <div className="bg-white rounded-full p-2 drop-shadow-2xl">
          <img className="h-5 w-5" src={logo} />
        </div>
        <div className=" p-2 border-green">
          <h3 className="bg-gradient-to-tr from-[#E4A51C] to-white text-transparent bg-clip-text text-lg lg:text-sm text-bold ">{name}</h3>
          <p className="text-lg lg:text-xs text-white opacity-80">{description}</p>
        </div>
      </div>
      {index !== 4 ? (
        <div className="h-[40px] w-[1px] pl-4">
          <hr className="border-[1px] border-[#AFB2BF] h-[100%] border-dotted" />
        </div>
      ) : null}
    </>
  );
};
