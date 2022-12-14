require("dotenv").config();
const knex = require("./database/db");

// UNCAUGHT EXCEPTIONS
// Application needs to be crashed then a tool will be needed to restart the APP
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!...");
  console.log({ err });
  console.log(err.name, err.message);
  process.exit();
});

const app = require("./app");

// check connection to the database for knex
knex
  .raw("select 1+1 as result")
  .then(() => {
    console.log("Knex connection successfully established");
  })
  .catch((err) => {
    console.log("Knex connection failed");
    console.log(err);
  });

//   START SERVER

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (!Number.isNaN(port)) {
    return val;
  }

  if (port > 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT ?? "8880");

/**
 * Event listener for HTTP server "listening" event.
 */

// create a http server
const server = app.listen(port, async () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
  // console.log(`Listening on ${chalk.green(bind)}`);
});

// Catching Exceptions

// Application does not necessarily need to be crashed
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!...");
  console.log(err.name, err.message);
  console.log({ err });
  server.close(() => {
    process.exit();
  });
});

process.on("SIGINT", async () => {
  process.exit(0);
});
