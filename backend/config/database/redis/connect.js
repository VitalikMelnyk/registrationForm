const redis = require("redis");
const redisClient = redis.createClient({ host: "127.0.0.1", port: 6379 });

redisClient.on("connect", function() {
  console.log("Redis client connected");
});

redisClient.on("error", function(err) {
  console.log("Something went wrong " + err);
});

// client.set("my test key", "my test value", redis.print);
// client.get("my test key", function(error, result) {
//   if (error) {
//     console.log(error);
//     throw error;
//   }
//   console.log("GET result ->" + result);
// });
module.exports = {
  redisClient
};
