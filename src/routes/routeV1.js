const router = require('express').Router();

router.get('/login', (req, res) => {
    res.send(
        {
            request: "json format: require email, password(e.g. {email: ~~~, password: ~~~})", 
            response: {
                success: "status: 200, msg: 'success'", 
                failed: "status: 404, msg: 'failed'"
            }
        }
    );
});

router.post('/login', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    const {email, password} = req.body;
    console.log(req.body);
    if(email == "jeffondev@gmail.com"){
        res.send({msg: "success"});
    }
    else {
        res.status(404).send({msg: "failed"});
    }
});

module.exports = router;