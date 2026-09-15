import app from "./src/app.js";
import dotenv from 'dotenv/config'

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`the server is running on http://localhost:${port}`)
})