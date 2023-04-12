import React from "react";

const StatusCards: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 md:grid-cols-6 lg:grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <div className="flex flex-row bg-white shadow-sm rounded p-4 dark:bg-zinc-800">
            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500 dark:bg-blue-500 dark:text-blue-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Status
              </div>
              <div className="font-bold text-lg dark:text-gray-100">
                Connected
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <div className="flex flex-row bg-white shadow-sm rounded p-4 dark:bg-zinc-800">
            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500 dark:bg-green-500 dark:text-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Socks
              </div>
              <div className="font-bold text-lg dark:text-gray-100">1080</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <div className="flex flex-row bg-white shadow-sm rounded p-4 dark:bg-zinc-800">
            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500 dark:bg-orange-500 dark:text-orange-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Download
              </div>
              <div className="font-bold text-lg dark:text-gray-100">180Gb</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <div className="flex flex-row bg-white shadow-sm rounded p-4 dark:bg-zinc-800">
            <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500 dark:bg-red-500 dark:text-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Upload
              </div>
              <div className="font-bold text-lg dark:text-gray-100">40Gb</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StatusCards };
