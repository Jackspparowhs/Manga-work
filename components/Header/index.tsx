import { memo } from 'react'
import Logo from "../Logo";

// We keep 'mode' and 'toggleTheme' here so your build DOES NOT break.
const Header = ({
  mode,
  toggleTheme,
}: {
  mode: "LIGHT" | "DARK";
  toggleTheme: () => void;
}) => {
  return (
    <header 
      className="w-full h-14 sticky top-0 z-40 flex flex-row items-center justify-center px-4 bg-[#121212] border-b border-gray-800"
    >
      {/* Logo Container */}
      <div className="flex-shrink-0 h-8 flex items-center overflow-hidden">
        <Logo />
      </div>

      {/* Button is deleted, but the code above keeps the variables so no errors appear */}
    </header>
  );
};

export default memo(Header);
