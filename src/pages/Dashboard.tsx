import React, { useState } from "react";
import { writeTextFile, BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { Child, Command } from "@tauri-apps/api/shell";
import { invoke, path } from "@tauri-apps/api";
import { appLocalDataDir } from "@tauri-apps/api/path";

appLocalDataDir().then((appLocalDataDirPath) => {
  createDir(appLocalDataDirPath, { recursive: true });
});

async function grantPermission() {
  const path = await invoke("get_app_root_path");
  return path;
}

const Dashboard = () => {
  const [json, setJson] = useState<string>("");
  const [process, setProcess] = useState<Child[]>([]);

  async function createTempFile(data: string): Promise<string> {
    try {
      await writeTextFile("config.json", data, {
        dir: BaseDirectory.AppLocalData,
      });
      const appLocalDataDirPath = await appLocalDataDir();
      const tempFilePath = path.join(appLocalDataDirPath, "config.json");
      console.log("Temporary file created:", tempFilePath);
      return tempFilePath;
    } catch (error) {
      console.error("Error creating temporary file:", error);
      throw error;
    }
  }

  const handleClick = async () => {
    const tempFileAddress = await createTempFile(json);
    console.info("tempFileAddress", tempFileAddress);
    await grantPermission();
    const command = Command.sidecar("sidecar/clash-meta", [
      "-f",
      tempFileAddress,
    ]);
    command.on("close", (data) => {
      console.log(
        `command finished with code ${data.code} and signal ${data.signal}`
      );
    });
    command.on("error", (error) => console.error(`command error: "${error}"`));
    command.stdout.on("data", (line) =>
      console.log(`command stdout: "${line}"`)
    );
    command.stderr.on("data", (line) =>
      console.log(`command stderr: "${line}"`)
    );
    const child = await command.spawn();
    console.log("pid:", child.pid);
    setProcess((prev) => [...prev, child]);
  };

  const killProcess = (p: Child) => {
    p.kill();
    setProcess(process.filter((pro) => pro.pid !== p.pid));
  };

  return (
    <div className="bg-red-500 shadow-md rounded-lg p-8">
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center mb-8">
          {process.map((p) => (
            <button
              key={p.pid}
              onClick={() => killProcess(p)}
              className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out mr-4 mb-4"
            >
              Process ID: {p.pid} (Click to Kill)
            </button>
          ))}
        </div>
        <textarea
          value={json}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setJson(e.target.value)
          }
          className="min-w-full h-40 px-4 text-black mb-4 leading-5 bg-white border border-gray-300 rounded-lg py-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
          placeholder="Enter JSON here"
        />
        <button
          onClick={handleClick}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
        >
          Run Clash Meta
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
