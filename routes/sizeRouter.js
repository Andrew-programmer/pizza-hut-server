const authMid = require('../middleware/authMiddleware');
const adminMid = require('../middleware/checkRoleMiddleware');

const Router = require('express');
const sizeController = require('../controllers/sizeContoller');

const router = new Router();

router.get('/', authMid, sizeController.getAll);
router.get('/:id', authMid, sizeController.getOne);

router.post('/', authMid, adminMid, sizeController.create);
router.put('/:id', authMid, adminMid, sizeController.redact);
router.delete('/:id', authMid, adminMid, sizeController.delete);

module.exports = router;