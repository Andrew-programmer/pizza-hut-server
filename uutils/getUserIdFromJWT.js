const jwt = require('jsonwebtoken');

module.exports =  (tokenStr) => {
    console.log(tokenStr);
    const token = tokenStr.split(' ')[1];
    console.log(token);
    const {id} = jwt.verify(token, process.env.SECRET_KEY);

    return id;
}