const {Size, Thick} = require('../models/models');
const ApiError = require('../error/ApiError');
const isCandidate = require('../uutils/checkCandidate');

const isSizeExist = isCandidate(Size);

class SizeController {
    async create(req, res, next) {
        const {name} = req.body;

        try {
            if (await isSizeExist({name: name})) {
                return next(ApiError.badRequest('Item already exist'));
            }

            const thick = await Size.create({name});

            return res.status(200).json({thick, message: 'Item was created'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;

        try {
            await Size.destroy({where: {id}});

            return res.status(200).json({message: 'Item was destroyed'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async redact(req, res, next) {
        const {name} = req.body;
        const {id} = req.params;

        try {
            if (!await isSizeExist({id: id})) {
                return next(ApiError.badRequest('Item not found'));
            }

            await Size.update({ name: name }, {
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
            if (!await isSizeExist({id: id})) {
                return next(ApiError.badRequest('No size found'));
            }

            const size = await Size.findOne({where: {id}});

            return res.status(200).json({size});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getAll(req, res, next) {
        try {
            const sizes = await Size.findAll();

            return res.status(200).json({sizes});
        } catch (e) {
            return next(ApiError.internal());
        }
    }
}

module.exports = new SizeController;