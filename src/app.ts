import express from "express"
import userRouters from "./routes/UserRoutes"

const app = express();
const port = 3000;
app.use(express.json());
app.use("/api", userRouters)
app.listen(port, ()=>{
    console.log(`Servidor Online em 
        http://127.0.0.1: ${port}`)
})