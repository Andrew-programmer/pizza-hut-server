const authMid = require('../middleware/authMiddleware');
const adminMid = require('../middleware/checkRoleMiddleware');

const Router = require('express');
const thickController = require('../controllers/thickContoller');

const router = new Router();

router.get('/', authMid, thickController.getAll);
router.get('/:id', authMid, thickController.getOne);

router.post('/', authMid, adminMid, thickController.create);
router.put('/:id', authMid, adminMid, thickController.redact);
router.delete('/:id', authMid, adminMid, thickController.delete);

module.exports = router;