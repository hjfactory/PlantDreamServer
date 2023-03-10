const { Seed, Plant } = require('../models');
const { Sequelize } = require("sequelize");
const moment = require("moment");

const dateOnly = (date) => {
  var timePortion = date.getTime() % (3600 * 1000 * 24);
  return new Date(date - timePortion);
}

const SeedController = {
  createSeed: async (req, res, next) => {
    const {title, planned_days, start_date } = req.body;
    console.log(start_date);
    const user_id = "0d78c419-faa5-4267-a05a-1f8be0132b1b";
    const seed = await Seed.create({
        user_id,
        title, 
        planned_days, 
        start_date: dateOnly(new Date(start_date))
    });
    if (seed) {
        res.send({msg: 'success'});
    }

  },
  getSeeds: async (req, res, next) => {
    const seeds = await Seed
        .findAll({
            where: {
                user_id: "0d78c419-faa5-4267-a05a-1f8be0132b1b"
            }, 
            raw: true,
        })
    res.send(seeds);
  }, 
  getSeedsToday: async (req, res, next) => {
    const today = dateOnly(new Date());
    const seeds = await Seed
        .findAll({
            where: {
                user_id: "0d78c419-faa5-4267-a05a-1f8be0132b1b", 
            }, 
            include: [
              {
                model: Plant, 
                where: {date: today},
                attributes: [],
                required: false
              }
            ],
            attributes: ['id', 'title', 'start_date', 'planned_days', 'Plants.weight'],
            raw: true,
        })
    const todaySeeds = [];
    seeds.forEach(item => {
      console.log(dateOnly(item.start_date), dateOnly(new Date()))
      todaySeeds.push(item)
    });
    // todaySeeds.push({})
    // const todaySeeds = seeds.map((item) => {
    //   return {};
    // });
    res.send(todaySeeds);
  }, 
  getSeedItem: async (req, res, next) => {
    console.log(req.params.id);
    const id = req.params.id;
    const seed = await Seed
      .findOne({
        where: {
          id,
          user_id: "0d78c419-faa5-4267-a05a-1f8be0132b1b"
        }, 
        raw: true,
      });
    if (!seed) {
      res.status(404).send('Not found');
    }

    const plants = await Plant
      .findAll({
        where: {
          seed_id: id
        }, 
        raw: true,
      })

    res.send(
      {
        title: seed.title, 
        start_date: seed.start_date,
        planned_days: seed.planned_days,
        plants
      }
    )
  }, 
  deleteSeedItem: async (req, res, next) => {
    const id = req.params.id;
    let date = req.pa
    const seed = await Seed
      .destroy({
        where: {
            id,
            user_id: "0d78c419-faa5-4267-a05a-1f8be0132b1b"
        }
      })
      .then(result => result === 1 ? 
        res.json({msg: 'success'}) :
        res.status(400).json({msg: 'failed'})
      );

  }, 
  createSeedItemPlant: async (req, res, next) => {
    const id = req.params.id;
    let date = req.body.date ? new Date(req.body.date) : new Date();
    date = dateOnly(date);

    // console.log

    const seed = await Seed
      .findOne({
        where: {
            id,
            user_id: "0d78c419-faa5-4267-a05a-1f8be0132b1b"
        }
      })

    if(!seed) {
      res.status(404).json({msg: `Not found Seed.(id: ${id})`})
    }
    console.log(date);
    const plant = await Plant
      .findOne({
        where: {
          seed_id: id,
          date
        }
      })
      .then((item) => {
        if(item) {
          return item.update({
            weight: Sequelize.literal('weight + 1')
          })
        }
        else {
          return Plant.create({
            seed_id: id,
            date,
            weight: 1
          });
        }
      });
    
    if(plant){
      res.json({msg: 'success'});
    }
    else {
      res.status(400).json({msg: `Resource not found(seed.id: ${id})`})
    }
  }
}

module.exports = SeedController;