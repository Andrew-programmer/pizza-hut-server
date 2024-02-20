module.exports = (database) => async (obj) => {
    return await database.findOne({where: obj});
}