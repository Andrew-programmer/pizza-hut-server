const ApiError = require('../error/ApiError');
const {Rating, Pizza, User, Size} = require('../models/models');
const isExist = require('../uutils/checkCandidate');

const isRatingExist = isExist(Rating);
const isPizzaExist = isExist(Pizza);
const isUserExist = isExist(User);


class RatingController {
    async create(req, res, next) {
        const {value, userId} = req.body;
        const {pizzaId} = req.params;

        try {
            if (await isRatingExist({userId: userId, pizzaId: pizzaId})) {
                return next(ApiError.badRequest('Rating already exist'));
            }

            const rating = await Rating.create({
                value,
                userId,
                pizzaId
            })

            return res.status(200).json({rating, message: 'Rating Created'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async delete(req, res, next) {
        const {userId} = req.body;
        const {pizzaId} = req.params;

        try {
            await Rating.destroy({where: {userId, pizzaId}});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async redact(req, res, next) {
        const {value, userId} = req.body;
        const {pizzaId} = req.params;

        try {
            if (!await isRatingExist({userId: userId, pizzaId: pizzaId})) {
                return next(ApiError.badRequest('Rating can not be found'));
            }


            await Size.update({ value: value }, {
                where: {
                    userId,
                    pizzaId
                },
            });

            return res.status(200).json({message: 'Rating is updated'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getRatingByPizza(req, res, next) {
        const {pizzaId} = req.params;

        try {
            if (!await isPizzaExist({pizzaId: pizzaId})) {
                return next(ApiError.badRequest('Pizza not found'));
            }

            const ratingByPizza = await Rating.findAll({where: {pizzaId}});

            return res.status(200).json({ratingByPizza});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getRatingByUser(req, res, next) {
        const {userId} = req.body;

        try {
            if (!await isUserExist({userId: userId})) {
                return next(ApiError.badRequest('User not found'));
            }

            const ratingByUser = await Rating.findAll({where: {userId}});

            return res.status(200).json({ratingByUser})
        } catch (e) {
            return next(ApiError.internal());
        }
    }
}

module.exports = new RatingController;