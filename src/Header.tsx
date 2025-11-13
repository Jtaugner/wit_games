import React from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  showMenu?: boolean;
  children?: React.ReactNode;
};

export default function Header({ showMenu = false, children }: HeaderProps) {
     const navigate = useNavigate();
     const handleLogoClick = () => {
          navigate("/");
        };
  return (
    <header className={showMenu ? "showMenu" : ""}>
      <div className="header__content">
        <div className="hideContent" />
        <div className="logo" onClick={handleLogoClick} />
        {children}
      </div>
    </header>
  );
}
