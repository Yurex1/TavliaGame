module.exports = {
    apps: [
      {
        name: "my-nestJs-backend",
        script: "dist/main.js",
        args: "",
        watch: false,
        autorestart: true,
        env: {
          PORT: process.env.PORT || 3000,
        },
      },
    ],
  };
