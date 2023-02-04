const { Router } = require('express');
const { getCategories } = require('../../../controllers/admin/category/controllerGetCategories');
const router = Router();

// GET /admin/categories
router.get(
    '/',
    async (req, res, next) => {
        try {
            const { page, size, sort, filter } = req.query;
            const categories = await getCategories(page, size, sort, filter);

            res.status(200).json(categories);
        } catch (error) {
            next(error)
        }
    }
);

module.exports = router;
