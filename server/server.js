const express = require("express")
const test = require("./test.json")

const PORT = process.env.PORT || 5001

const app = express()

app.get("/api", (req, res) => {
    res.json(test)
  })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})