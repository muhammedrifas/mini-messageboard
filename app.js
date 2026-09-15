const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware to parse urlencoded form submissions
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
// Mount router
app.use("/", indexRouter);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Export the app for Vercel's serverless handler
module.exports = app;