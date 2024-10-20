import { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="flex p-5 justify-between md:justify-center items-center relative h-20">
      <nav
        className={`flex flex-col md:flex-row transition-all duration-300  ${
          isNavOpen
            ? "absolute right-0 top-20 w-[800px]"
            : "absolute -right-[1500px] top-20"
        } md:relative md:left-auto md:top-auto md:right-auto px-5 bg-white md:bg-transparent text-xl gap-2 items-end md:items-center md:gap-10 z-50`}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/" className="no-border">
          <img
            className="hidden md:block md:h-16 md:w-16"
            src="/logo.jpg"
            alt="logo-img"
          />
        </NavLink>
        <NavLink to="/career">Career</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/admin">Admin Page</NavLink>
      </nav>
      <div className="flex gap-5 text-lg md:text-2xl md:absolute md:right-5">
        <a href="#">
          <FaFacebookF />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
      </div>
      <img
        className="block md:hidden h-14 w-14"
        src="/logo.jpg"
        alt="logo-img"
      />
      {isNavOpen ? (
        <RxCross1 className="md:hidden" onClick={() => setIsNavOpen(false)} />
      ) : (
        <GiHamburgerMenu
          onClick={() => setIsNavOpen(true)}
          className="md:hidden"
        />
      )}
    </header>
  );
};

export default Header;
