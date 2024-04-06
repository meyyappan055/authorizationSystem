const express  = require("express");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
app.use("/auth", authRoutes); // Corrected

app.listen(5000, function(){
    console.log("Server running on port 5000");
});
