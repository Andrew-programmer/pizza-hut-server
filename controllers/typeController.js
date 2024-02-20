const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');
const isCandidate = require('../uutils/checkCandidate');

const isTypeExist = isCandidate(Type);

class TypeController {
    async create(req, res, next) {
        const {name} = req.body;

        try {
            if (await isTypeExist({name: name})) {
                return next(ApiError.badRequest('Item already exist'));
            }

            const type = await Type.create({name});

            return res.status(200).json({type, message: 'Item was created'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;

        try {
            await Type.destroy({where: {id}});

            return res.status(200).json({message: 'Item was destroyed'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async redact(req, res, next) {
        const {name} = req.body;
        const {id} = req.params;


        try {
            if (!await isTypeExist({id: id})) {
                return next(ApiError.badRequest('Item not found'));
            }

            await Type.update({ name: name }, {
                where: {
                    id: id,
                },
            });

            return res.status(200).json({message: 'Item was updated'});
        } catch (e) {
            console.log(e);
            return next(ApiError.internal());
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;

        try {
            if (!await isTypeExist({id: id})) {
                return next(ApiError.badRequest('No type found'));
            }

            const type = await Type.findOne({where: {id}});

            return res.status(200).json({type});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getAll(req, res, next) {
        try {
            const types = await Type.findAll();

            return res.status(200).json({types});
        } catch (e) {
            return next(ApiError.internal());
        }
    }
}

module.exports = new TypeController;