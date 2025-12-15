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
    // FIXED:
    // 1. Added 'sticky top-0 z-40' so the navbar stays visible when scrolling (Like Just Anime)
    // 2. Added 'px-4' so the button never touches the edge of the iPhone screen
    // 3. Added 'backdrop-blur' for a modern glass effect
    <header 
      className={`
        w-full sticky top-0 z-40 
        flex flex-row flex-nowrap justify-between items-center 
        px-4 py-2 md:px-6 md:py-3
        transition-colors duration-300 border-b
        backdrop-blur-md
        ${mode === 'LIGHT' 
          ? 'bg-white/90 border-gray-200' 
          : 'bg-[#1a1a1a]/95 border-gray-800' // Darker, cleaner background
        }
      `}
    >
      {/* Container for Logo - prevents it from growing too wide */}
      <div className="flex-shrink-0 max-w-[70%] overflow-hidden">
        <Logo />
      </div>

      {/* Theme Toggle Button */}
      <button 
        type="button" 
        role="button" 
        aria-label="Toggle Theme"
        onClick={toggleTheme}
        className={`
          p-2 rounded-full transition-transform active:scale-95
          ${mode === 'LIGHT' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}
        `}
      >
        <Mode {...{ mode }} />
      </button>
    </header>
  );
};

export default memo(Header);
