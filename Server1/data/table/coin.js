module.exports = (sequelize, DataTypes) => {
    return sequelize.define('coin', {

        user_id: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            allowNull: false
        },
        knu_coin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        event_coin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    },{
        timestamps: false,
        tableName: 'coin'
    })

}