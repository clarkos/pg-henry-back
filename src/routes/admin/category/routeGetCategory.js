const { Router } = require('express');
const { getCategory } = require('../../../controllers/admin/category/controllerGetCategory');

const router = Router();

// GET /categories/{id}
router.get(
    '/:id',
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const category = await getCategory(id);

            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
