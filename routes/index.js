
const Router = require('express');

const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const thickRouter = require('./thickRouter');
const sizeRouter = require('./sizeRouter');
const ratingRouter = require('./ratingRouter');
const pizzaRouter = require('./pizzaRouter');
const basketDeviceRouter = require('./basketDeviceRouter');

const indexRouter = new Router();

indexRouter.use('/user', userRouter);
indexRouter.use('/type', typeRouter);
indexRouter.use('/thick', thickRouter);
indexRouter.use('/size', sizeRouter);
indexRouter.use('/rating', ratingRouter);
indexRouter.use('/pizza', pizzaRouter);
indexRouter.use('/basketDevice', basketDeviceRouter);

module.exports = indexRouter;