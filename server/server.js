require("dotenv").config()

const express = require("express")
const app = express()

//Middleware
app.use(express.json())

//Redirect to endpoint
app.use("/user", require("./routes/userRoutes.js"))

//Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack)
  console.log(err.name)
  console.log(err.code)

  res.status(500).json({
    message: "There was a oopsie daisy"
  })
})

//Listen to port
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {console.log(`Server listening on ${PORT}`)})