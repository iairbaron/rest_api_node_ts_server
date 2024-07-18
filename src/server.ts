import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();

    console.log(colors.blue("Successful connection to the database"));
  } catch (err) {
    console.log(colors.bgRed.bold(`Error connecting database ${err}`));
  }
}

connectDB();

const server = express();

server.use(express.json());

server.use("/api/products", router);
server.get('/api',(req,res)=>{
  res.json({msg:"Desde API"})
})

export default server;
