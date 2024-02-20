const authMid = require('../middleware/authMiddleware');
const adminMid = require('../middleware/checkRoleMiddleware');

const Router = require('express');
const basketDeviceController = require('../controllers/basketDeviceController');

const router = new Router();

router.post('/', authMid, basketDeviceController.create);
router.delete('/:id', authMid, basketDeviceController.delete);
router.delete('/user/:id', authMid, basketDeviceController.deleteAllByUser);
router.get('/user/:id', authMid, basketDeviceController.getAllByUser);
router.get('/:id', authMid, basketDeviceController.getOneById);
router.put('/add/:id', authMid, basketDeviceController.addOne);
router.put('/remove/:id', authMid, basketDeviceController.removeOne);
router.get('/totalPriceByUser/:id', authMid, basketDeviceController.getTotalPriceByUser);

module.exports = router;