import { useState, useEffect, useRef } from "react";
import cx from "classnames";

interface SidebarProps {
  activeView: string;
  views: string[];
  onViewChange: (view: string) => void;
}

const Sidebar = ({ views, activeView, onViewChange }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node | null) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, isOpen]);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleClickView(view: string) {
    setIsOpen(false);
    onViewChange(view);
  }

  return (
    <>
      {!isOpen && (
        <button
          className="block md:hidden rounded-lg bg-gray-800 py-2 px-4 fixed right-0 bottom-0 m-4 z-10"
          onClick={handleToggleMenu}
        >
          <svg
            className="w-6 h-6 fill-current text-gray-300"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 6H3V4H21V6Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <div
        className={cx(
          "bg-gray-800",
          "py-4",
          "px-6",
          "h-screen",
          "fixed",
          "inset-y-0",
          "left-0",
          "transform",
          "transition",
          "ease-in-out",
          "duration-300",
          "z-10",
          "md:translate-x-0",
          "md:relative",
          "md:h-auto",
          { "translate-x-0": isOpen, "-translate-x-full": !isOpen }
        )}
        ref={menuRef}
      >
        <h1 className="text-white text-2xl mb-4 flex items-center">
          <span role="img" aria-label="Rocket Emoji" className="mr-1">
            🚀
          </span>
          Clash Rocket
        </h1>
        <ul className="space-y-4">
          {views.map((view) => (
            <li
              key={view}
              className={`text-gray-300 hover:text-white cursor-pointer ${
                activeView === view ? "font-medium text-white" : ""
              }`}
              onClick={() => handleClickView(view)}
            >
              {view}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
