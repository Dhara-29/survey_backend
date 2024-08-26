import Category from "../model/category.model.js";

export const addCategory = async (req, res, next) => {
    try {
        let category = await Category.findOne({ where: { category_name: req.body.category_name } })
        const { category_id, category_name } = req.body;
        if (!category) {
            const category = await Category.create({
                category_id,
                category_name,
            }).then((result) => {
                return res.status(200).json({ data: result.dataValues, message: "Category added....." })
            }).catch((err) => {
                return res.status(500).json({ err: "Internal Server Error..." })
            })
        }
        else {
            console.log("Category already exist.");
            return res.status(400).json("User already exist.. sjfhhdg.");
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
}
export const removeCategory = async (req, res) => {
    try {
        const { category_name } = req.body;

        if (!category_name) {
            return res.status(400).json({ error: 'Category Name is required' });
        }

        const result = await Category.destroy({
            where: { category_name }
        });


        if (result === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }


        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category', details: error.message });
    }
};
// Function to get all categories
export const getAllCategories = async (req, res) => {
    try {
        // Retrieve all categories from the database
        const categories = await Category.findAll();

        // Check if categories are found
        if (categories.length === 0) {
            return res.status(404).json({ message: 'No categories found' });
        }

        // Respond with the list of categories
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories', details: error.message });
    }
};