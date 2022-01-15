const cors = require("cors");
const fileUpload = require("express-fileupload");

function mockServer(app) {
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  );
  app.use(cors());

  app.get("/app/sample/*", (req, res) => {
    res.type("html");
    res.sendFile(path.join(__dirname + "/../app/index.html"));
  });
}

module.exports = mockServer;
