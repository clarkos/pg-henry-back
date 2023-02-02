const router = require("express").Router();
const Sequelize = require("sequelize");
const { Product, Artist } = require("../../db");
const Op = Sequelize.Op;
const Data = require('../../fakeData.json');

router.get("/", async function (req, res) {
    let { name } = req.query;
    try {
      //buscando en DB
      let dbResult = await Product.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });

      let dbFormated = []; // formateando la respuesta
      dbResult.map((e) => {
        const obj = 
        {
          id: e.id, 
          locationId: e.locationId,
          artistId: e.artistId,
          name: e.name,
          description: e.description,
          startDate: e.startDate,
          startTime: e.startTime,
          stock: e.stock,
          price: e.price,
        }
        dbFormated.push(obj);
      });

      res.status(200).json(`Encontrados ${dbFormated.length} registros`);
    } catch (error) {
      res.status(402).send({error: error.message});
    }
});

module.exports = router;

/* 
const search = (filterParams) => {
  try {
    let workouts = Data.workouts;
    if (filterParams.mode) {
      return Data.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    // Other if-statements will go here for different parameters
    return workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
*/