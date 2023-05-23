import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const Product = sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    }
})