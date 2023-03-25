
import pug from "pug";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { nextTick } from "process";
import User from "../public/models/userModel.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);


const pathToTemplates = path.resolve(__dirname, "..", "views", "");

export const getUsers = async (req, res) => {
  const userTemplatePath = path.resolve(pathToTemplates, "users.pug");
  const template = pug.compileFile(userTemplatePath);
  const users =  await User.find();
  const renderedTemplate = template({ users: users });
  res.send(renderedTemplate);
};

export const getUserById = async (req, res, next) => {

  const id = req.params.id;
  const user = await User.findById(id)

  req.user = user;
  next();
};

export const deleteUser =  async (req, res,next) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.redirect('/users')
};

export const addUserForm = (req,res)=>{
  const userTemplatePath = path.resolve(pathToTemplates, "add-user.pug");
  const template = pug.compileFile(userTemplatePath);
  const renderedTemplate = template();
  res.send(renderedTemplate)
}

export const addUser = async (req, res,next) => {
  const { name, email, address, course } = req.body;
  const newUser = {
    name,
    email,
    address,
    course,
  };
  await User.create(newUser)
  res.redirect('/users')
};

export const updateUser = async (req,res) => {
  const id = req.params.id;

  const { name, email, address, course } = req.body;
  const  updatedUser = {
    name,
    email,
    address,
    course
  }

  await User.findByIdAndUpdate(id,updatedUser,{
    new:true,
    runValidators:true
  })
  res.redirect('/users')

  
}

export const editUserForm =  (req,res)=>{
  const userTemplatePath = path.resolve(pathToTemplates, "update-user.pug");
  const template = pug.compileFile(userTemplatePath);
  const id = req.params.id
  const renderedTemplate = template({ user: req.user });
  res.send(renderedTemplate);
}