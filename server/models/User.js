module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING
        },
        email : {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING
        }
    })
    return Users
}