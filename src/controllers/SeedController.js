const { Seed } = require('../models');

const SeedController = {
  createSeed: async (req, res, next) => {
    const {title, planned_days, start_date } = req.body;
    const user_id = "0d78c419-faa5-4267-a05a-1f8be0132b1b";
    const seed = await Seed.create({
        user_id,
        title, 
        planned_days, 
        start_date
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

    res.send(
      {
        title: seed.title, 
        start_date: seed.start_date,
        planned_days: seed.planned_days,
        plants: [
          {
            "date": "2023-01-23",
            "weight": 1,
            "msg": "자! 시작합니다."
          },
          {
            "date": "2023-01-24",
            "weight": 1,
            "msg": ""
          },
          {
            "date": "2023-01-25",
            "weight": 2,
            "msg": ""
          },
          {
            "date": "2023-01-26",
            "weight": 2,
            "msg": ""
          },
          {
            "date": "2023-01-27",
            "weight": 1,
            "msg": ""
          },
          {
            "date": "2023-01-28",
            "weight": 1,
            "msg": ""
          },
          {
            "date": "2023-01-29",
            "weight": 1,
            "msg": ""
          },
          {
            "date": "2023-02-01",
            "weight": 1,
            "msg": "놓쳤네요."
          },
          {
            "date": "2023-02-02",
            "weight": 3,
            "msg": ""
          },
          {
            "date": "2023-02-04",
            "weight": 1,
            "msg": "다시 화이팅"
          },
        ]
      }
    )
  }, 
  deleteSeedItem: async (req, res, next) => {
    const id = req.params.id;
    const seed = await Seed.destroy({
      where: {
          id,
          user_id: "0d78c419-faa5-4267-a05a-1f8be0132b1b"
      }
    })
    .then(result => result === 1 ? 
      res.json({msg: 'success'}) :
      res.status(400).json({msg: 'failed'})
      );

  }
}

module.exports = SeedController;