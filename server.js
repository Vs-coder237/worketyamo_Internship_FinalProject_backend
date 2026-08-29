import app from "./src/app.js";
const port = 3000

app.listen(port, () => {
    console.log(`the server is running on http://localhost:${port}`)
})