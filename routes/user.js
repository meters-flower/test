var express = require('express');
var router = express.Router();
var user = require('../server/controller/userCtrl');

router.post('/addUser',user.userAddAction());
router.get('/getUsers',user.userFindAction());

module.exports = router;