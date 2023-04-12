import React from "react";
import { useProfileStore } from "@/store/Profile.store";
import { Type } from "@/types/ClashMetaProfile.type";
import classNames from "classnames";
import { Icons } from "../Icons";

const proxyTypeLabelMap: Record<Type, string> = {
  [Type.Shadowsocks]:
    "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  [Type.ShadowsocksR]:
    "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  [Type.Vmess]:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  [Type.Socks]:
    "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300",
  [Type.Http]:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  [Type.Vless]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [Type.Snell]: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  [Type.Trojan]:
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
  [Type.Hysteria]:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  [Type.Tuic]: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  [Type.Wireguard]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const ProfilesTable: React.FC = () => {
  const profiles = useProfileStore((state) => state.profiles);
  const removeProfile = useProfileStore((state) => state.removeProfile);
  const isFetchingProfile = useProfileStore((state) => state.isFetchingProfile);

  return (
    <>
      {isFetchingProfile && (
        <div className="flex p-16 align-middle justify-center text-sm">
          <div
            className="text-zinc-800 inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}

      {!isFetchingProfile && profiles.length === 0 && (
        <div className="flex p-16 align-middle justify-center text-sm">
          No profiles yet, start adding them to show up here!
        </div>
      )}

      <div className="relative overflow-x-auto sm:rounded-lg border dark:border-zinc-700">
        {profiles.map((profile) => (
          <div key={profile.url} className=" dark:bg-zinc-800">
            <div className="flex justify-between items-center px-6 py-3 text-zinc-800 dark:text-zinc-200">
              <h3 className="text-sm font-medium">{profile.domainName}</h3>
              <Icons.Trash
                className="w-6 h-6 cursor-pointer text-current"
                onClick={() => removeProfile(profile)}
              />
            </div>
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
                    className="border-b dark:bg-zinc-800 dark:border-zinc-700"
                  >
                    <td className="px-6 py-1">{proxy.name}</td>
                    <td className="px-6 py-1">
                      <span
                        className={classNames(
                          "text-xs font-medium mr-2 px-2.5 py-0.5 rounded",
                          proxyTypeLabelMap[proxy.type || Type.Http]
                        )}
                      >
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
                        <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export { ProfilesTable };
