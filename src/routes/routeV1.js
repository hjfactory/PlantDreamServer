"use strict";

const router = require('express').Router();
const { User, Seed } = require('../models');

/// ##########################################
/// Seeds

const crypto = require('crypto');

// REF - https://zinirun.github.io/2020/12/02/node-crypto-password/
const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });

const createHashedPassword = (plainPassword) =>
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });

const makePasswordHashed = (email, password) =>
    new Promise(async (resolve, reject) => {
        // salt를 가져오는 부분은 각자의 DB에 따라 수정
        const salt = await User
            .findOne({
                attributes: ['salt'],
                raw: true,
                where: {
                    email,
                },
            })
            .then((result) => result.salt);
        crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve(key.toString('base64'));
        });
    });

router.post('/auth/signup', async (req, res, next) => {
    const { email, password, name, phone } = req.body;
    console.log(password);

    const user = await User
        .findOne({
            where: {email: email}, 
            raw: true,
        });
    console.log(user);
    if(user) {
        res.status(409).send({msg: `Aleady exist email: ${user.email}`});
        res.end();
        return;
    }

    try {
        const { password: encryptedPassword, salt } = await createHashedPassword(password);
        const user = await User.create({
            email,
            password: encryptedPassword,
            salt,
            name,
            phone
        });
        if (user) {
            res.send({msg: 'success'});
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/auth/signin', async (req, res, next) => {
    const {email, password: plainPassword} = req.body;
    const password = await makePasswordHashed(email, plainPassword);

    const user = await User
        .findOne({
            where: {email, password}, 
            raw: true,
        });

    if(user) {
        res.send({msg: "success"});
    }
    else {
        res.status(404).send({msg: '로그인 정보를 확인하세요.'});
    }
});

/// ##########################################
/// Seeds
router.post('/seeds', async (req, res, next) => {
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

});

router.get('/seeds', async (req, res, next) => {
    const seeds = await Seed
        .findAll({
            where: {
                user_id: "0d78c419-faa5-4267-a05a-1f8be0132b1b"
            }, 
            raw: true,
        })
    res.send(seeds);
});

router.get('/seeds/:id', async (req, res, next) => {
    console.log(req.params.id);
    res.send(
      {
        title: "test", 
        start_date: "2023-01-23",
        planned_days: 21,
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
});

module.exports = router;