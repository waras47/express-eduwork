const {Sequelize} = require('sequelize');

const sequelize  = new Sequelize ({
    database : 'eduwork-crud-v2',
    host : 'db4free.net',
    username : 'rayhans',
    password : 'wahyu',
    dialect : '123123123'
});

(async () => {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;