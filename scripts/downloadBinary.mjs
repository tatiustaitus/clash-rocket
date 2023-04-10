import fs from "fs-extra";
import zlib from "zlib";
import path from "path";
import AdmZip from "adm-zip";
import fetch from "node-fetch";
import proxyAgent from "https-proxy-agent";
import { execSync } from "child_process";

const cwd = process.cwd();
const TEMP_DIR = path.join(cwd, "node_modules/.clashrocket");
const FORCE = process.argv.includes("--force");

const SIDECAR_HOST = execSync("rustc -vV")
  .toString()
  .match(/(?<=host: ).+(?=\s*)/g)[0];

/* ======= clash meta ======= */
const META_URL_PREFIX = `https://github.com/MetaCubeX/Clash.Meta/releases/download/`;
const META_VERSION = "v1.14.3";

const META_MAP = {
  "win32-x64": "Clash.Meta-windows-amd64-compatible",
  "darwin-x64": "Clash.Meta-darwin-amd64",
  "darwin-arm64": "Clash.Meta-darwin-arm64",
  "linux-x64": "Clash.Meta-linux-amd64-compatible",
  "linux-arm64": "Clash.Meta-linux-arm64",
};

/**
 * check available
 */

const { platform, arch } = process;
if (!META_MAP[`${platform}-${arch}`]) {
  throw new Error(`clash meta unsupported platform "${platform}-${arch}"`);
}

function clashMeta() {
  const name = META_MAP[`${platform}-${arch}`];
  const isWin = platform === "win32";
  const urlExt = isWin ? "zip" : "gz";
  const downloadURL = `${META_URL_PREFIX}${META_VERSION}/${name}-${META_VERSION}.${urlExt}`;
  const exeFile = `${name}${isWin ? ".exe" : ""}`;
  const zipFile = `${name}-${META_VERSION}.${urlExt}`;

  return {
    name: "clash-meta",
    targetFile: `clash-meta-${SIDECAR_HOST}${isWin ? ".exe" : ""}`,
    exeFile,
    zipFile,
    downloadURL,
  };
}

/**
 * download sidecar and rename
 */
async function resolveSidecar(binInfo) {
  const { name, targetFile, zipFile, exeFile, downloadURL } = binInfo;

  const sidecarDir = path.join(cwd, "src-tauri", "sidecar");
  const sidecarPath = path.join(sidecarDir, targetFile);

  await fs.mkdirp(sidecarDir);
  if (!FORCE && (await fs.pathExists(sidecarPath))) return;

  const tempDir = path.join(TEMP_DIR, name);
  const tempZip = path.join(tempDir, zipFile);
  const tempExe = path.join(tempDir, exeFile);

  await fs.mkdirp(tempDir);
  if (!(await fs.pathExists(tempZip))) await downloadFile(downloadURL, tempZip);

  if (zipFile.endsWith(".zip")) {
    const zip = new AdmZip(tempZip);
    zip.getEntries().forEach((entry) => {
      console.log(`[DEBUG]: ${name} entry name`, entry.entryName);
    });
    zip.extractAllTo(tempDir, true);
    await fs.rename(tempExe, sidecarPath);
    console.log(`[INFO]: ${name} unzip finished`);
  } else {
    // gz
    const readStream = fs.createReadStream(tempZip);
    const writeStream = fs.createWriteStream(sidecarPath);
    readStream
      .pipe(zlib.createGunzip())
      .pipe(writeStream)
      .on("finish", () => {
        console.log(`[INFO]: ${name} gunzip finished`);
        execSync(`chmod 755 ${sidecarPath}`);
        console.log(`[INFO]: ${name} chmod binary finished`);
      })
      .on("error", (error) => {
        console.error(`[ERROR]: ${name} gz failed`, error.message);
        throw error;
      });
  }

  // delete temp dir
  await fs.remove(tempDir);
}

/**
 * download the file to the resources dir
 */
async function resolveResource(binInfo) {
  const { file, downloadURL } = binInfo;

  const resDir = path.join(cwd, "src-tauri/resources");
  const targetPath = path.join(resDir, file);

  if (!FORCE && (await fs.pathExists(targetPath))) return;

  await fs.mkdirp(resDir);
  await downloadFile(downloadURL, targetPath);

  console.log(`[INFO]: ${file} finished`);
}

/**
 * download file and save to `path`
 */
async function downloadFile(url, path) {
  const options = {};

  const httpProxy =
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    process.env.HTTPS_PROXY ||
    process.env.https_proxy;

  if (httpProxy) {
    options.agent = proxyAgent(httpProxy);
  }

  const response = await fetch(url, {
    ...options,
    method: "GET",
    headers: { "Content-Type": "application/octet-stream" },
  });
  const buffer = await response.arrayBuffer();
  await fs.writeFile(path, new Uint8Array(buffer));

  console.log(`[INFO]: download finished "${url}"`);
}

/**
 * main
 */
const resolveMmdb = () =>
  resolveResource({
    file: "Country.mmdb",
    downloadURL: `https://github.com/Dreamacro/maxmind-geoip/releases/download/20221112/Country.mmdb`,
  });
const resolveGeosite = () =>
  resolveResource({
    file: "geosite.dat",
    downloadURL: `https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geosite.dat`,
  });
const resolveGeoIP = () =>
  resolveResource({
    file: "geoip.dat",
    downloadURL: `https://github.com/Loyalsoldier/geoip/releases/latest/download/geoip.dat`,
  });

const tasks = [
  { name: "clash-meta", func: () => resolveSidecar(clashMeta()), retry: 5 },
  //   { name: "mmdb", func: resolveMmdb, retry: 5 },
  //   { name: "geosite", func: resolveGeosite, retry: 5 },
  //   { name: "geoip", func: resolveGeoIP, retry: 5 },
];

async function runTask() {
  const task = tasks.shift();
  if (!task) return;
  if (task.winOnly && process.platform !== "win32") return runTask();

  for (let i = 0; i < task.retry; i++) {
    try {
      await task.func();
      break;
    } catch (err) {
      console.error(`[ERROR]: task::${task.name} try ${i} == `, err.message);
    }
  }
  return runTask();
}

runTask();
runTask();
