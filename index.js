const http = require("http");
const logger = require("./core/utils/logger.js");

function aClient() {
  return {
    config: process.env,
    commands: new Map(),
    events: new Map(),
    getTime: function (ts) {
      return new Date(ts).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "Asia/Ho_Chi_Minh",
      });
    },
    apis: {},
    mainPath: process.cwd(),
  };
}

(async () => {
  (await import("dotenv")).config();

  const { Zalo } = await import("./node_modules/zca-js/dist/index.js");

  const zalo = new Zalo(
    {
      cookie: process.env.COOKIE,
      imei: process.env.IMEI,
      userAgent: process.env.USER_AGENT,
    },
    {
      selfListen: process.env.SELFLISTEN === "true",
      checkUpdate: process.env.CHECKUPDATE === "true",
    },
  );
  global.client = aClient();

  try {
    const api = await zalo.login();
    const { default: handleCommands } = await import(
        "./core/handleCommands.js"
      ),
      { default: handleEvent } = await import("./core/handleEvent.js"),
      { default: listen } = await import("./core/listen.js");

    handleCommands();
    handleEvent();

    const server = http.createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Server is running.");
    });

    server.listen(2410, () => {
      console.log("Server đang lắng nghe trên cổng 2410.");
      listen(api, zalo);
    });

    logger.info("Đã load thành công các mô-đun.");
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
  }
})();
