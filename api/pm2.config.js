module.exports = {
  apps: [
    {
      name: "api",
      script: "src/apiService.ts",
      watch: ["src"],
      cwd: "api",
      exec_mode: "cluster",
      ignore_watch: ["node_modules"],
      watch_delay: 1000,
    },
  ],
};
