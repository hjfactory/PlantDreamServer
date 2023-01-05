const router = require('express').Router();

router.post('/login', (req, res) => {
    const {id, password} = req.body;
    console.log(id);

    res.send({msg: "success"});
});

module.exports = router;