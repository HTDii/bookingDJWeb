const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


//Route Get
router.get('/', homeController.index);

module.exports = router;