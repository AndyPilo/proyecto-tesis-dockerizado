import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const register = async (req, res) => {
  const { username, password, email } = req.body;

  const userFound = await User.findOne({email});
  if(userFound) return res.status(400).json(["El correo ya esta en uso"])

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({
      username,
      password: passwordHash,
      email,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    console.log(userSaved)

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json(["Credenciales no validas" ]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json( ["Credenciales no validas" ]);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req,res) => {
  const {token} = req.cookies

  if(!token){
    return res.status(401).json({message: "No autorizado"})
  }

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if(error){
      return res.status(401).json({message: "No autorizado"})
    }
    const userFound = User.findById(user.id);
    if(!userFound){
      return res.status(401).json({message: "No autorizado"})
    }
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    })
  });
}
