module.exports = {
  apps : [{
    name        : "my-app",
    script      : "./app.js", // path needs to be relative from ecosystem.config.js
    watch       : true, // any changes to app folder will get pm2 to restart app
    env         : {
      "NODE_ENV": "production", // define env variables here
    }
  }]
}