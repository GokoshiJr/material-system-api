const { verifyToken } = require('../middlewares/authJwt')
const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/CampaignController');

// return all campaigns
router.get('/', verifyToken, index);

// return campaign by id
router.get('/:id', verifyToken, show);

// create campaign
router.post('/', verifyToken, store);

// update campaign by id
router.put('/:id', verifyToken, update);

// delete campaign by id
router.delete('/:id', verifyToken, destroy);

module.exports = router;