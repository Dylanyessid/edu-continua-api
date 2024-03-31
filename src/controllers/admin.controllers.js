import {dataSource} from "../../db.js"
import { hash, compare } from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()
const adminRepository = dataSource.getRepository("Admin")
export const login = async(req, res) => {
    try {
        const admin = await adminRepository.findOne({where:{username: req.body.username}})
        
        if(!admin) return res.status(404).json({error:"User not found"})
        const passwordMatch = await compare(req.body.password, admin.password);
        if(passwordMatch){
            const token = jwt.sign({ user: { id: admin.id, username: admin.username } }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({message:"ok", token})
        }else{
            return res.status(401).json({error:"invalid credentials"})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const register = async(req, res) => {
    
    const hashedPass = await hash(req.body.password, 10)
    console.log(hashedPass)
    let data = {
        username:req.body.username,
        password:hashedPass,
        isActive:true
    }
    try {
        const admin = await adminRepository.findOne({where:{username: req.body.username}})
        if(admin) return res.status(400).json({error:"User already exists"})
        await adminRepository.save(data)
        return res.status(200).json({message:"ok"})
    } catch (error) {
        return res.status(500).json(error)
    }
}