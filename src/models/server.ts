import express from "express";
import cors from 'cors'
import routesProduct from "../routes/product";
import routesUser from "../routes/user";
import { Product } from "./product";
import { User } from "./user";

class Server {
  private app: express.Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = "3000";
    this.listen();
    this.midlewares();
    this.routes();
    this.dbConnect();
  }
  listen() {
    this.app.listen(process.env.PORT || this.port, () => {
      console.log("aplicacion corriendo en el puerto" + this.port);
    });
  }
  routes() {
    this.app.use("/api/products", routesProduct);
    this.app.use("/api/users", routesUser);
  }
  midlewares() {
    this.app.use(express.json());
    this.app.use(cors())
  }
  async dbConnect() {
    try {
      await Product.sync();
      await User.sync();
    } catch (error) {
      console.error("No se pudo conectar a la base de datos", error);
    }
  }
}
export default Server;
