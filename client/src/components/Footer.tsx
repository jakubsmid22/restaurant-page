import { FaRegCopyright } from "react-icons/fa";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="h-20 flex justify-center items-center gap-5">
      <p className="flex flex-row gap-2 items-center">
        <FaRegCopyright /> {year}
      </p>
      <p>Restaurant Name</p>
      <img src="/logo.jpg" alt="logo-img" className="w-10 h-10" />
      <p>
        Created by{" "}
        <a href="https://github.com/jakubsmid22?tab=repositories" target="_blank" className="font-bold">Jakub Šmíd</a>
      </p>
    </footer>
  );
};
