const {Sequelize} = require('sequelize');


const sequelize = new Sequelize ({
    host : 'localhost',
    username:'root',
    password : 'wahyu',
    database: 'eduwork-crud-v2',
    dialect : 'mysql' 
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established seccusefully.');
    } catch(error){
        console.error ('unable to connect to the database : ', error)
    }
})();

module.exports = sequelize;