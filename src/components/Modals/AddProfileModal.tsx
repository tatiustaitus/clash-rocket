import React, { useState } from "react";
import { Modal } from "./Modal";

interface AddProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
}

const AddProfileModal: React.FC<AddProfileModalProps> = ({
  isOpen,
  onSave,
  onClose,
}) => {
  const [url, setUrl] = useState<string>("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg shadow dark:bg-zinc-800">
        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-zinc-600">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Add a new profile
            <span className="ml-4 bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
              clash
            </span>
          </h3>
          <button
            type="button"
            className="text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-zinc-600 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <label
            htmlFor="first-name"
            className="block mb-2 text-sm font-medium text-zinc-900 dark:text-white"
          >
            Enter profile/subscription url address
          </label>
          <textarea
            autoFocus
            rows={3}
            name="first-name"
            id="first-name"
            className="shadow-sm bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-600 dark:border-zinc-500 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https:// or http://"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <div className="flex items-center p-6 space-x-2 border-t border-zinc-200 rounded-b dark:border-zinc-600">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => onSave(url)}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export { AddProfileModal };
