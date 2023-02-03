const { Router } = require('express');
const { createCategory } = require('../../../controllers/admin/category/controllerPostCategory');

const router = Router();

// POST /categories
router.post(
    '/',
    async (req, res, next) => {
        try {
            const { name, status } = req.body;
            // console.log('post /categories req.body: ', req.body);

            const category = await createCategory(name, status);

            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
