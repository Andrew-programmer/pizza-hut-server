const {User} = require('../models/models');
const isExist = require('../uutils/checkCandidate');
const getID = require('../uutils/getUserIdFromJWT');
const ApiError = require('../error/ApiError');


const isUserExist = isExist(User);

module.exports = async (req, res, next) => {
    if(req.method === 'OPTION') {
        next();
    }

    try {
        const token = req.headers.authorization;
        const id = getID(token);

        if (!isUserExist({id: id})) {
            next(ApiError.badRequest('User is not found'));
        }



        const user = await User.findOne({where: {id}});

        if(user.role !== 'ADMIN') {
            next(ApiError.badRequest('User does not have rights'))
        }

        next();
    } catch (e) {
        console.log(e);
        next(ApiError.internal());
    }
}