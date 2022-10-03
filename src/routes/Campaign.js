const { verifyToken } = require('../middlewares/authJwt')
const express = require('express');
const router = express.Router();
const {
	getCampaignUnasigned,
	getCampaignTypes,
	clientCampaigns,
	clientInCampaign,
	stadistics,
	index,
	show,
	store,
	update,
	destroy
} = require('../controllers/CampaignController');


// return all campaigns unasigned in projection
router.get('/unasigned', verifyToken, getCampaignUnasigned);

// return all campaign types
router.get('/campaignTypes', verifyToken, getCampaignTypes);

// return campaigns for client by id
router.get('/clientCampaigns/:id', verifyToken, clientCampaigns);

// return clientInCampaign for campaign
router.get('/clientInCampaign/:id', verifyToken, clientInCampaign);

// return statdistics for campaigns
router.get('/stadistics', verifyToken, stadistics);

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
