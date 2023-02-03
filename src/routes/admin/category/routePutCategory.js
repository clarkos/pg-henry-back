const { Router } = require('express');
const { editCategory } = require('../../../controllers/admin/category/controllerPutCategory');

const router = Router();

// PUT /categories/{id}
router.put(
    '/:id',
    async (req, res, next) => {
        try {
            // console.log('PUT /categories/{id}');
            const { id } = req.params;
            const { name, status } = req.body;
            // console.log('put /categories/:id req.body: ', req.body);

            const category = await editCategory(id, name, status);

            res.status(200).json(category);
        } catch (error) {
            // console.log('PUT /categories/{id} error: ', error);
            next(error);
        }
    }
);

module.exports = router;
