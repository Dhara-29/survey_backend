import express from "express";
import { createSurvey, getAllSurveys, getSurveysByCategory, removeSurvey, viewParticularSurveyByTitle } from "../controller/survey.controller.js";

const app = express.Router();
app.post('/createSurvey',createSurvey);
app.delete('/removeSurvey',removeSurvey);
app.get('/getAllSurveys',getAllSurveys);
app.get('/getSurveysByCategory',getSurveysByCategory);
app.get('/viewParticularSurveyByTitle',viewParticularSurveyByTitle);

export default app;