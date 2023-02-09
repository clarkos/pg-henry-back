const { Router } = require('express');
const { getCategories } = require('../../controllers/admin/category/controllerGetCategories');

const router = Router();

router.get('/', async(req, res) => {
    try {

        // let filter = {
        //     status: "Active"
        // };

        const response = await getCategories();              

        const categories = response.rows.map(r => (
            {
               id: r.id,
                name: r.name
            }
        ));

        if (categories.length) return res.status(200).json(categories);
        res.status(404).json({error: `No existen categorias registrados`}); 
    }catch(e) {
        res.status(400).json({error: e.message});
    }
});

module.exports = router;