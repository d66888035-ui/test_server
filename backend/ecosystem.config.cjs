module.exports = {
  apps: [
    {
      name: "app",
      script: "./start.cjs",
      cwd: "/home/apisit/test_server/backend",
      interpreter: "node",
      watch: false,
    },
  ],
};
