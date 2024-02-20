const authMid = require('../middleware/authMiddleware');
const adminMid = require('../middleware/checkRoleMiddleware');

const Router = require('express');
const typeController = require('../controllers/typeController');

const router = new Router();

router.get('/', authMid, typeController.getAll);
router.get('/:id', authMid, typeController.getOne);

router.post('/', authMid, adminMid, typeController.create);
router.delete('/:id', authMid, adminMid, typeController.delete);
router.put('/:id', authMid, adminMid, typeController.redact);

module.exports = router;