import { dataSource } from "../../db.js";
import { hash, compare } from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { generateToken } from "../helpers/jwt.js";
dotenv.config();
const adminRepository = dataSource.getRepository("Admin");
export const login = async (req, res) => {
  try {
    const admin = await adminRepository.findOne({
      where: { username: req.body.username },
    });

    if (!admin) return res.status(401).json({ error: "Invalid credentials" });
    const passwordMatch = await compare(req.body.password, admin.password);
    if (passwordMatch) {
      const token = generateToken({username:req.body.username})
      return res.status(200).json({ message: "ok", token });
    } else {
      return res.status(401).json({ error: "invalid credentials" });
    }
  } catch (error) {
   
    return res
      .status(500)
      .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
};

export const register = async (req, res) => {
  const hashedPass = await hash(req.body.password, 10);
  let data = {
    username: req.body.username,
    password: hashedPass,
    isActive: true,
  };
  try {
    const admin = await adminRepository.findOne({
      where: { username: req.body.username },
    });
    if (admin) return res.status(400).json({ error: "User already exists" });
    await adminRepository.save(data);
    return res.status(200).json({ message: "ok" });
  } catch (error) {

    return res
      .status(500)
      .json({ isSuccess: false, message: "Ha ocurrido un error." });
  }
};
