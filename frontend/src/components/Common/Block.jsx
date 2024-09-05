export const Block = ({ resource }) => {

  return (
    <div className ="flex flex-col gap-2 x">
      {resource.map((it, index) => {
        return <p key = {index} className="px-2 cursor-pointer py-0.5 ">{it.name || it.title}</p>;
      })}
    </div>
  );
};
