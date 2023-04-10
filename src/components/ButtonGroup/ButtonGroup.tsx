import React from "react";
import classNames from "classnames";

type Option = {
  label: string;
  value: string;
  icon?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  disabledLabel?: string;
};

type ButtonGroupProps = {
  options: Option[];
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options }) => {
  const onClick = (option: Option) => {
    if (!option.disabled) {
      option.onClick?.();
    }
  };

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {options.map((option, index) => (
        <button
          disabled={option.disabled}
          onClick={() => onClick(option)}
          key={`option-${index}`}
          type="button"
          className={classNames(
            "inline-flex items-center px-4 py-2 text-sm font-medium transition duration-200 ease-in-out",
            "bg-white text-gray-700 hover:bg-gray-300 hover:text-gray-800 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white active:bg-gray-400 active:text-gray-900 dark:active:bg-gray-500 dark:active:text-white",
            {
              "rounded-l-md": index === 0 && index !== options.length - 1,
              "rounded-r-md": index === options.length - 1 && index !== 0,
            },
            {
              "cursor-not-allowed": option.disabled,
              "bg-gray-300": option.disabled,
              "dark:bg-gray-700": option.disabled,
            }
          )}
        >
          {option.icon && option.icon}
          {option.disabled ? option.disabledLabel : option.label}
        </button>
      ))}
    </div>
  );
};

export { ButtonGroup };
