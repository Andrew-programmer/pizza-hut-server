const {BasketItem, Basket, User, Pizza} = require('../models/models');
const isExist = require('../uutils/checkCandidate');
const getUserId = require('../uutils/getUserIdFromJWT');
const ApiError = require('../error/ApiError');

const isBasketItemExist = isExist(BasketItem);
const isUserExist = isExist(User);

const calculatePrice = async (basketItems) => {
    let sumPrice = 0;

    basketItems.forEach(item => {
        const pizza = Pizza.findOne({where: {id: item.pizzaId}});
        sumPrice += pizza.price;
    })

    return sumPrice;
}

class BasketDeviceController {
    async create(req, res, next) {
        const {pizzaId} = req.params;
        const userId = getUserId(req.headers.authorization);

        try {
            if (isBasketItemExist([pizzaId])) {
                return next(ApiError.badRequest('Item is already exist'));
            }

            const newItem = await BasketItem.create({
                pizzaId,
                basketId: userId
            });

            return res.status(200).json({newItem, message: 'Item is added to the basket!'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;

        try {
            await BasketItem.destroy({where: {id}});

            return res.status(200).json({message: 'Item is deleted'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async deleteAllByUser(req, res, next) {
        const {id} = req.params;

        try {
            if (!isUserExist([id])) {
                return next(ApiError.badRequest('No user found'));
            }

            const allItemsByUser = await BasketItem.findAll({where: {basketId: id}});

            allItemsByUser.forEach(item => {
                BasketItem.destroy({where: {id: item.id}});
            })

            return res.status(200).json({message: 'All items are deleted'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getAllByUser(req, res, next){
        const {id} = req.params;

        try {
            if (!isUserExist([id])) {
                return next(ApiError.badRequest('No such user in database'));
            }

            const allBasketItems = await BasketItem.findAll({where: {basketId: id}});

            return res.status(200).json({allBasketItems});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getTotalPriceByUser(req, res, next){
        const {id} = req.params;

        try {
            if (!isUserExist([id])) {
                return next(ApiError.badRequest('No user found'));
            }

            const items = await BasketItem.findAll({where: {basketId: id}});
            const sumPrice = calculatePrice(items);

            return res.status(200).json({sumPrice});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getOneById(req, res, next) {
        const {id} = req.params;

        try {
            if (!isBasketItemExist([id])) {
                return next(ApiError.badRequest('No item found'));
            }

            const item = await BasketItem.findOne({where: {id}});

            return res.status(200).json({item});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async addOne(req, res, next) {
        const {id} = req.params;

        try {
            if (!isBasketItemExist([id])) {
                return next(ApiError.badRequest('No item found'));
            }

            const item = await BasketItem.findOne({where: {id}});
            const newCount = ++item.count;

            await BasketItem.update({
                count: newCount
            }, {
                where: id
            })
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async removeOne(req, res, next) {
        const {id} = req.params;

        try {
            if (!isBasketItemExist([id])) {
                return next(ApiError.badRequest('No item found'));
            }

            const item = await BasketItem.findOne({where: {id}});
            const newCount = --item.count;

            await BasketItem.update({
                count: newCount
            }, {
                where: id
            })
        } catch (e) {
            return next(ApiError.internal());
        }
    }
}

module.exports = new BasketDeviceController;