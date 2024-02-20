const authMid = require('../middleware/authMiddleware');
const adminMid = require('../middleware/checkRoleMiddleware');

const Router = require('express');
const pizzaController = require('../controllers/pizzaController');

const router = new Router();

router.get('/', authMid, pizzaController.getAll);
router.get('/:id', authMid, pizzaController.getOne);

router.post('/', authMid, adminMid, pizzaController.create);
router.put('/:id', authMid, adminMid, pizzaController.redact);
router.delete('/:id', authMid, adminMid, pizzaController.delete);

module.exports = router;