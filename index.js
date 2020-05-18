const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function(req, file, cb) {
    console.log(file);
    cb(
      null,
      "Image-" + Date.now().toString() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
}).single("files");

const staticPath = path.join(__dirname, "../client/dist");
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log(path.join(__dirname, "../client/dist"));
  res.send("index.html");
});

app.post("/api/upload-files", (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      console.log(req.file);
      res.send("Ok");
    }
  });
});

// app.listen(3000, "192.168.0.56", () => {
//   console.log("Running");
// });

app.listen(9000, () => {
  console.log("Server running");
});
