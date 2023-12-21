module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define("Todos", {
        title: {
            type:DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        isFinish: {
            type: DataTypes.BOOLEAN,
            default: 0
        },
        finish_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        deleted_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
        
    })
    return Todos
}