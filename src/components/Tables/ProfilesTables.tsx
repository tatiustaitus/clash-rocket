import React from "react";
import { useProfileStore } from "../../store/Profile.store";
import { Type } from "../../types/ClashMetaProfile.type";

const getProxyTypeLabelClassNames = (type: Type = Type.Vmess): string => {
  const classNames = ["text-xs font-medium mr-2 px-2.5 py-0.5 rounded"];

  if (type === Type.Trojan) {
    classNames.push(
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
    );
  }

  if (type === Type.Vless) {
    classNames.push(
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    );
  }

  if (type === Type.Vmess) {
    classNames.push(
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    );
  }

  return classNames.join(" ");
};

const ProfilesTable: React.FC = () => {
  const profiles = useProfileStore((state) => state.profiles);
  const isFetchingProfile = useProfileStore((state) => state.isFetchingProfile);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg border">
      {profiles.length === 0 && (
        <div className="flex p-16 align-middle justify-center text-sm">
          {isFetchingProfile ? (
            <div
              className="text-gray-800 inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            <div>No profiles yet, start adding them to show up here!</div>
          )}
        </div>
      )}
      {profiles.map((profile) => (
        <div key={profile.url}>
          <h3 className="text-sm font-medium text-gray-800 px-6 py-3">
            {profile.domainName}
          </h3>
          <table className="w-full text-sm text-left text-gray-800 dark:text-gray-200">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  type
                </th>
                <th scope="col" className="px-6 py-3">
                  port
                </th>
                <th scope="col" className="px-6 py-3">
                  Ping
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {profile.data?.proxies?.map((proxy) => (
                <tr
                  key={proxy.name}
                  className="border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-1">{proxy.name}</td>
                  <td className="px-6 py-1">
                    <span className={getProxyTypeLabelClassNames(proxy.type)}>
                      {proxy.type}
                    </span>
                  </td>
                  <td className="px-6 py-1">{proxy.port}</td>
                  <td className="px-6 py-1">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{" "}
                      30ms
                    </div>
                  </td>

                  <td className="px-6 py-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export { ProfilesTable };
