const config = {
  APP_NAME: "coder70190",
  PORT: 8080,
  MONGODB_URI: process.env.MONGODB_URI,
  SECRET: process.env.SECRET,
  ADMIN_USER: process.env.ADMIN_USER,
  ADMIN_PASS: process.env.ADMIN_PASS,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GIT_HUB_CALLBACK_URL: process.env.GIT_HUB_CALLBACK_URL,
  MONGODB_ID_REGEX: /^[a-f-\d]{24}$/i,
  PERSISTENCE: "mongodb",
  GMAIL_USER: process.env.GMAIL_USER_APP,
  GMAIL_PASS: process.env.GMAIL_PASS_APP
};

export default config;
