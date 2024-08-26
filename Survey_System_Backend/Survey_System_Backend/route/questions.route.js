import express from "express";
import { addQuestion, removeOption, removeQuestion, removeQuestionBySurveyId, updatedOption } from "../controller/questions.controller.js";

const app = express.Router();

app.post('/addQuestion',addQuestion);

app.put('/update-option',updatedOption);
app.delete('/removeOption',removeOption);
app.delete('/removeQuestion',removeQuestion);
app.delete('/removeQuestionBySurveyId',removeQuestionBySurveyId);

export default app;