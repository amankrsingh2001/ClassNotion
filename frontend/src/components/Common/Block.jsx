export const Block = ({ resource }) => {
  return (
    <ul className="flex flex-col gap-2.5">
      {resource.map((it, index) => (
        <li key={index} className="w-fit cursor-pointer text-white/45 hover:text-white transition-colors">
          {it.name || it.title}
        </li>
      ))}
    </ul>
  );
};
