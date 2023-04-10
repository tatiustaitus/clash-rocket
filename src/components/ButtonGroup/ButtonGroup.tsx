import React from "react";
import classNames from "classnames";

type Option = {
  label: string;
  value: string;
  icon?: JSX.Element;
  onClick?: () => void;
};

type ButtonGroupProps = {
  options: Option[];
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options }) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {options.map((option, index) => (
        <button
          onClick={option.onClick}
          key={`option-${index}`}
          type="button"
          className={classNames(
            "inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 ease-in-out",
            "bg-white text-gray-700 hover:bg-gray-300 hover:text-gray-800 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white active:bg-gray-400 active:text-gray-900 dark:active:bg-gray-500 dark:active:text-white",
            {
              "rounded-l-md": index === 0 && index !== options.length - 1,
              "rounded-r-md": index === options.length - 1 && index !== 0,
            }
          )}
        >
          {option.icon && option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
