import { memo } from 'react'
import Logo from "../Logo";

const Header = () => {
  return (
    <header 
      className="w-full h-14 sticky top-0 z-40 flex flex-row items-center justify-between px-4 bg-[#121212] border-b border-gray-800"
    >
      {/* Logo Container */}
      <div className="flex-shrink-0 h-8 flex items-center overflow-hidden">
        <Logo />
      </div>

      {/* Button is completely removed */}
    </header>
  );
};

export default memo(Header);
