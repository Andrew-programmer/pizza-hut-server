const {Thick, Type} = require('../models/models');
const ApiError = require('../error/ApiError');
const isCandidate = require('../uutils/checkCandidate');

const isThickExist = isCandidate(Thick);

class ThickController {
    async create(req, res, next) {
        const {name} = req.body;

        try {
            if (await isThickExist({name: name})) {
                return next(ApiError.badRequest('Item already exist'));
            }

            const thick = await Thick.create({name});

            return res.status(200).json({thick, message: 'Item was created'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;

        try {
            await Thick.destroy({where: {id}});

            return res.status(200).json({message: 'Item was destroyed'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async redact(req, res, next) {
        const {name} = req.body;
        const {id} = req.params;

        try {
            if (!await isThickExist({id: id})) {
                return next(ApiError.badRequest('Item not found'));
            }

            await Thick.update({ name: name }, {
                where: {
                    id: id,
                },
            });

            return res.status(200).json({message: 'Item was updated'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;

        try {
            if (!await isThickExist({id: id})) {
                return next(ApiError.badRequest('No thick found'));
            }

            const thick = await Thick.findOne({where: {id}});

            return res.status(200).json({thick});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getAll(req, res, next) {
        try {
            const thicks = await Thick.findAll();

            return res.status(200).json({thicks});
        } catch (e) {
            return next(ApiError.internal());
        }
    }
}

module.exports = new ThickController;