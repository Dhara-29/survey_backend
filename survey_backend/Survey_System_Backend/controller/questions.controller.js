import Questions from "../model/questions.model.js";


export const addQuestion = async (req, res, next) => {
  console.log(req.body);
  try {
    const { survey_id, user_id, question_type, question_text, questionOptions, question_answer_text } = req.body;

    // Convert questionOptions to JSON if question_type is MCQ
    const formattedOptions = question_type === 'MCQ' ? JSON.stringify(questionOptions) : null;

    const Question = await Questions.create({
      survey_id,
      user_id,
      question_type,
      question_text,
      question_Options: formattedOptions, // Store options as JSON string if type is MCQ
      question_answer_text
    });
    
    res.status(201).json(Question);
    console.log("Question added-------------- : ", Question);
    
  } catch (error) {
    console.log('Error details:', error); // Detailed error logging
    res.status(500).json({ error: 'Error creating question', details: error.message });
  }
};


//Remove question
export const removeQuestion = async (req, res, next) => {
  try {
    const { user_id, question_id } = req.body; // Get the user_id and question_id from request body

    // Check if the question exists for the given user
    const question = await Questions.findOne({
      where: {
        user_id: user_id,
        question_id: question_id
      }
    });

    // If question not found, return 404
    if (!question) {
      return res.status(404).json({ message: 'Question not found or does not belong to this user' });
    }

    // Remove the question
    await Questions.destroy({
      where: {
        user_id: user_id,
        question_id: question_id
      }
    });

    res.status(200).json({ message: 'Question removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing question', details: error.message });
  }
};

//Remove Question using SurveyId

export const removeQuestionBySurveyId = async (req, res, next) => {
  try {
    const { survey_id, question_id } = req.body; // Get the survey_id and question_id from request body

    // Check if the question exists for the given survey
    const question = await Questions.findOne({
      where: {
        survey_id: survey_id,
        question_id: question_id
      }
    });

    // If question not found, return 404
    if (!question) {
      return res.status(404).json({ message: 'Question not found in this survey' });
    }

    // Remove the question
    await Questions.destroy({
      where: {
        survey_id: survey_id,
        question_id: question_id
      }
    });

    res.status(200).json({ message: 'Question removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing question', details: error.message });
  }
};



// Update option
export const updatedOption = async (req, res) => {
  try {
    const question_id = req.body.question_id;
    const optionId = req.body.optionId;
    const newOption = req.body.newOption;

    console.log("inside try-----------------------");

    // Fetch the question from the database
    const question = await Questions.findOne({
      where: { question_id: question_id },

    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    let options = question.question_Options;

    // Debug log to check options array
    console.log("Options:", options);
    console.log("Option ID (type):", typeof optionId, optionId);

    // Find the option to update
    let optionToUpdate = options.find(option => option.id == optionId); // Use `==` to allow type coercion
    console.log("Option to update:", optionToUpdate); // Log this for debugging

    if (optionToUpdate) {
      optionToUpdate.option = newOption;
    } else {
      return res.status(404).json({ message: 'Option not found' });
    }
    // Save the updated options back to the database
    question.question_Options = options;
    await Questions.update(
      { question_Options: options },
      { where: { question_id: question_id } }
    );
    res.json({ message: 'Option updated successfully', updatedOptions: question.question_Options });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the option' });
  }
}

//Remove Option

export const removeOption = async (req, res) => {
  try {
    const question_id = req.body.question_id;
    const optionId = req.body.optionId;

    console.log("Inside remove option-----------------------");

    // Fetch the question from the database
    const question = await Questions.findOne({
      where: { question_id: question_id },
    });

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    let options = question.question_Options;

    console.log("Options before removal:", options);
    console.log("Option ID to remove (type):", typeof optionId, optionId);

    const updatedOptions = options.filter(option => option.id != optionId); 

    if (options.length === updatedOptions.length) {
      return res.status(404).json({ message: 'Option not found' });
    }

    question.question_Options = updatedOptions;

    await Questions.update(
      { question_Options: updatedOptions },
      { where: { question_id: question_id } }
    );

    res.json({ message: 'Option removed successfully', updatedOptions: question.question_Options });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while removing the option' });
  }
}
