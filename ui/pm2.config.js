module.exports = {
  apps: [
    {
      name: "ui-service",
      cwd: "ui",
      script: "npm run start",
      // args: "start",
      interpreter: "ts-node", // Use ts-node to run TypeScript code directly
      watch: true, // Enable watch mode for automatic restart on file changes (during development)
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
