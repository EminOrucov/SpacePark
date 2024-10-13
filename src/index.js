const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const parkRouter = require('./routers/parkRouter')

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use(userRouter)
app.use(parkRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})