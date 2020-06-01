module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {

        user_id: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false
        },
        pwd: {
            type: DataTypes.STRING(6000),
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING(6000),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        signup_time: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },{
        timestamps: false,
        tableName: 'user'
    })
}