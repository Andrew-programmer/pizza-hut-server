const authMid = require('../middleware/authMiddleware');
const adminMid = require('../middleware/checkRoleMiddleware');

const Router = require('express');
const userController = require('../controllers/userController');

const router = new Router();

router.post('/register', userController.registration);
router.post('/login', userController.login);

router.get('/:id', authMid, adminMid, userController.getOne);
router.get('/', authMid, adminMid, userController.getAll);

module.exports = router;