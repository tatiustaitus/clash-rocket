const { setup: setupTauri } = require("tauri-testing");

module.exports = async () => {
  await setupTauri();
};
