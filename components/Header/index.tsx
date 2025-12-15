import { memo } from 'react'
import Logo from "../Logo";
import Mode from "../Mode";

const Header = ({
  mode,
  toggleTheme,
}: {
  mode: "LIGHT" | "DARK";
  toggleTheme: () => void;
}) => {
  return (
    <header 
      className={`
        w-full sticky top-0 z-40 
        h-14  /* FIXED HEIGHT: Prevents it from getting too big */
        flex flex-row items-center justify-between 
        px-4  /* Padding on sides so button doesn't touch edge */
        border-b backdrop-blur-md transition-colors duration-300
        ${mode === 'LIGHT' 
          ? 'bg-white/95 border-gray-200' 
          : 'bg-[#121212]/95 border-gray-800' 
        }
      `}
    >
      {/* Restrict Logo Height */}
      <div className="flex-shrink-0 h-8 flex items-center overflow-hidden">
        <Logo />
      </div>

      {/* Theme Button */}
      <button 
        type="button" 
        onClick={toggleTheme}
        className={`
          p-2 rounded-full flex items-center justify-center
          ${mode === 'LIGHT' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}
        `}
      >
        <Mode {...{ mode }} />
      </button>
    </header>
  );
};

export default memo(Header);
