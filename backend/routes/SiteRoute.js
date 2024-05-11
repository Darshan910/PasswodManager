const express = require('express');
const router = express.Router();
const { postSite, updateSite, getSite, deleteSite } = require('../controllers/SiteDetails');
const { auth } = require('../middlewares/auth');

// Define routes
router.post('/site', auth, postSite);
router.put('/site/:id', auth, updateSite);
router.get('/site', auth, getSite);
router.delete('/site/:id', auth, deleteSite);


// router.post('/site', postSite);
// router.put('/site/:id', updateSite);
// router.get('/site', getSite);
// router.delete('/site/:id', deleteSite);

module.exports = router;
