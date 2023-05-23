import { Request,Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const newUser = async (req:Request,res:Response) =>{
    const {username,password} = req.body

    //validamos si ya existe un usuario en la base de datos

    const user = await User.findOne({where:{username:username}})

    if(user){
        return res.status(400).json({
            msg: 'Ya existe un usuario con el nombre '+ username
        })
    }

    const hashPassword= await bcrypt.hash(password,10)

    try{
        await User.create({
            username: username,
            password:hashPassword
        })
    }catch(error){
        res.status(400).json({
            msg: 'Ups ocurrio un error',
            error
        })
    }
    

    res.json({
        msg: 'Usuario '+ username+' creado existosamente',
    })
}
export const loginUser = async (req:Request,res:Response) =>{
    const {username,password} = req.body

    const user: any = await User.findOne({where:{username:username}})
    if(!user){
        return res.status(400).json({
            msg: 'No existe un usuario con el usuario '+username
        })
    }
    const passwordValid = await bcrypt.compare(password,user.password)
    if(!passwordValid){
        return res.status(400).json({
            msg:'Password incorrecta'
        })
    }
    const token = jwt.sign({
        username:username
    },process.env.SECRET_KEY||'ejemplo1');

    res.json(token)
}