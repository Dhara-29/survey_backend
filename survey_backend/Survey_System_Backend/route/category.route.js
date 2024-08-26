import express from "express";
import { addCategory, getAllCategories, removeCategory } from "../controller/category.controller.js";
import { authenticateToken } from "./user.route.js";
const app = express.Router();
app.post('/addCategory',addCategory);
app.delete('/removeCategory',removeCategory);
app.get('/getAllCategories',getAllCategories);
export default app;