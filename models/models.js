const db = require('../db');
const {DataTypes} = require('sequelize');

const User = db.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'}
});

const Pizza = db.define('pizza', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    img: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false}
});

const Thick = db.define('thick', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const Type = db.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const Size = db.define('size', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
});

const Basket = db.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true}
});

const BasketItem = db.define('basketItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    count: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1}
});

const Rating = db.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true},
    value: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 5}
});


User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketItem);
BasketItem.belongsTo(Basket);

Pizza.hasMany(Thick);
Thick.belongsTo(Pizza);

Pizza.hasOne(Type);
Type.belongsTo(Pizza);

Pizza.hasMany(Size);
Size.belongsTo(Pizza);

Pizza.hasMany(Rating);
Rating.belongsTo(Pizza);

Pizza.hasMany(BasketItem);
BasketItem.belongsTo(Pizza);

module.exports = {
    User,
    Basket,
    Rating,
    BasketItem,
    Thick,
    Pizza,
    Type,
    Size
}