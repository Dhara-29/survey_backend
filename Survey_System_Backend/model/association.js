import Category from "./category.model.js";
import Questions from "./questions.model.js";
import Survey from "./survey.model.js";
import User from "./user.model.js";
// Define associations
Survey.belongsTo(User, {
      foreignKey: 'userId'
});

Category.hasMany(Survey, {
      foreignKey: 'category_id',
});
Survey.belongsTo(Category, {
      foreignKey: 'category_id',
});
User.hasMany(Questions, {
      foreignKey: 'user_id'
})
Survey.hasMany(Questions, {
      foreignKey: 'survey_id'
})

// Export models
export default { Survey, User, Category, Questions };