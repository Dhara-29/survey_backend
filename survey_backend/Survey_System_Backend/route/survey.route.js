import express from "express";
import { createSurvey, getAllSurveys, getSurveysByCategory, getSurveysByUserId, removeSurvey, viewParticularSurveyByTitle } from "../controller/survey.controller.js";

const app = express.Router();
app.post('/createSurvey',createSurvey);
app.delete('/removeSurvey',removeSurvey);
app.get('/getAllSurveys',getAllSurveys);
app.get('/getSurveysByCategory',getSurveysByCategory);
app.get('/viewParticularSurveyByTitle',viewParticularSurveyByTitle);
app.get('/getSurveysByUserId',getSurveysByUserId);
export default app;