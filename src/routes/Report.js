const { verifyToken } = require('../middlewares/authJwt')
const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/ReportController');

// return all reports
router.get('/', verifyToken, index);

// return report by id
router.get('/:id', verifyToken, show);

// create report
router.post('/', verifyToken, store);

// update report by id
router.put('/:id', verifyToken, update);

// delete report by id
router.delete('/:id', verifyToken, destroy);

module.exports = router;
