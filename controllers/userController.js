const ApiError = require('../error/ApiError');
const {User, Basket} = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJWT = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            email: user.email
        },
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController {
    async registration(req, res, next) {
        const {
            email,
            password
        } = req.body;

        try {

            const candidate = await User.findOne({where: {email}});

            if (candidate) {
                return next(ApiError.badRequest('User is exist'));
            }

            const encryptedPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                email,
                password: encryptedPassword
            });
            const basket = await Basket.create({userId: user.id});
            const token = generateJWT(user);

            return res.status(200).json({token});

        } catch (e) {
            console.log(e);
            return next(ApiError.internal());
        }
    }


    async login(req, res, next) {
        const {email, password} = req.body;

        try {
            const candidate = await User.findOne({where: {email}});

            if (!candidate) {
                return next(ApiError.badRequest('No such user exist. Check you email address'));
            }

            const passCheck = bcrypt.compare(password, candidate.password);

            if (!passCheck) {
                return next(ApiError.badRequest('Password is incorrect'));
            }

            const token = generateJWT(candidate);

            return res.status(200).json({token});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await User.findAll();

            return res.status(200).json({users});
        } catch (e) {
            return next(ApiError.internal());
        }
    }

    async getOne(req, res, next) {
        const {id} = req.params;


        try {
            const user = await User.findOne({where: {id}});

            if (!user) {
                return next(ApiError.badRequest('User can not be found'));
            }

            return res.status(200).json({user});
        } catch (e) {
            console.log(e);
            return next(ApiError.internal());
        }
    }
}

module.exports = new UserController;