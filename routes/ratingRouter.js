const authMid = require('../middleware/authMiddleware');
const adminMid = require('../middleware/checkRoleMiddleware');

const Router = require('express');
const ratingController = require('../controllers/ratingController');

const router = new Router();

router.get('/user/:id', authMid, adminMid, ratingController.getRatingByUser);

router.get('/pizza/:id', authMid, ratingController.getRatingByPizza);
router.post('/', authMid, ratingController.create);
router.put('/:id', authMid, ratingController.redact);
router.delete('/:id', authMid, ratingController.delete);

module.exports = router;