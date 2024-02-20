const uuid = require('uuid');
const {Pizza} = require('../models/models');
const ApiError = require('../error/ApiError');
const path = require('path');
const tty = require("tty");

const createImage = async (img) => {
    const fileName = uuid.v4() + '.jpg';
    await img.mv(path.resolve(__dirname, '..', 'static', fileName));

    return fileName;
}

class PizzaController {
    async create(req, res, next) {
        const {
            name,
            price,
            thickId,
            typeId,
            sizeId
        } = req.body;

        const img = req.files;

        try {
            const candidate = await Pizza.findOne({where: {name}});

            if (candidate) {
                return next(ApiError.badRequest('Item already exist'));
            }

            const fileName = await createImage(img);

            const pizza = await Pizza.create({
                name,
                price,
                thickId,
                typeId,
                sizeId,
                img: fileName
            });

            return res.status(200).json({pizza, message: 'Item was created!'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async delete(req, res, next) {
        const {id} = req.params;

        try {
            await Pizza.destroy({where: {id}});

            return res.status(200).json({message: 'Item was deleted!'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async redact(req, res, next) {
        const {id} = req.params;
        const {
            name,
            price,
            thickId,
            typeId,
            sizeId
        } = req.body

        const img = req.files;

        try {

            const candidate = await Pizza.findOne({where: {id}});

            if (candidate) {
                return next(ApiError.badRequest('Item not found'));
            }

            const fileName = await createImage(img);

            await Pizza.update({
                name,
                price,
                thickId,
                typeId,
                sizeId,
                img: fileName
            }, {
                where: {id}
            })

            return res.status(200).json({message: 'Item is updated!'});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getAll(req, res, next) {
        try {
            const allPizza = await Pizza.findAll();

            return res.status(200).json({allPizza});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;

        try {
            const pizza = await Pizza.findOne({where: {id}});

            if (!pizza) {
                return next(ApiError.badRequest('Item not found'));
            }

            return res.status(200).json({pizza});
        } catch (e) {
            return next(ApiError.internal());
        }
    }
}

module.exports = new PizzaController;