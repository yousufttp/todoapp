const mongoose = require("mongoose");
const uri = "mongodb+srv://<username>:<password>@cluster0.56cdf.mongodb.net/todo?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: "true",
  useUnifiedTopology: true
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})