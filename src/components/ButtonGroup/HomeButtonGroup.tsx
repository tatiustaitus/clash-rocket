import React from "react";
import { useProfileStore } from "../../store/Profile.store";
import { ButtonGroup } from "./ButtonGroup";

type HomeButtonGroupProps = {
  onAddProfile: () => void;
};

const HomeButtonGroup: React.FC<HomeButtonGroupProps> = ({ onAddProfile }) => {
  const isFetchingProfile = useProfileStore((state) => state.isFetchingProfile);

  return (
    <ButtonGroup
      options={[
        {
          onClick: onAddProfile,
          label: "Add a profile",
          value: "add-profile",
          disabled: isFetchingProfile,
          disabledLabel: "Downloading profile...",
          icon: (
            <svg
              fill="none"
              className="w-4 h-4 mr-2 fill-current"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              ></path>
            </svg>
          ),
        },
        {
          label: "Ping test",
          value: "ping-test",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 mr-2 fill-current"
            >
              <title>Speedometer</title>
              <path d="M326.1 231.9l-47.5 75.5a31 31 0 01-7 7 30.11 30.11 0 01-35-49l75.5-47.5a10.23 10.23 0 0111.7 0 10.06 10.06 0 012.3 14z" />
              <path
                d="M256 64C132.3 64 32 164.2 32 287.9a223.18 223.18 0 0056.3 148.5c1.1 1.2 2.1 2.4 3.2 3.5a25.19 25.19 0 0037.1-.1 173.13 173.13 0 01254.8 0 25.19 25.19 0 0037.1.1l3.2-3.5A223.18 223.18 0 00480 287.9C480 164.2 379.7 64 256 64z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M256 128v32M416 288h-32M128 288H96M165.49 197.49l-22.63-22.63M346.51 197.49l22.63-22.63"
              />
            </svg>
          ),
        },
        {
          label: "Paste from clipboard",
          value: "clipboard-paste",
          icon: (
            <svg
              className="w-4 h-4 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <title>Clipboard</title>
              <path
                d="M336 64h32a48 48 0 0148 48v320a48 48 0 01-48 48H144a48 48 0 01-48-48V112a48 48 0 0148-48h32"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="32"
              />
              <rect
                x="176"
                y="32"
                width="160"
                height="64"
                rx="26.13"
                ry="26.13"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="32"
              />
            </svg>
          ),
        },
      ]}
    />
  );
};

export { HomeButtonGroup };
