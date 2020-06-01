module.exports = (sequelize, DataTypes) => {
    return sequelize.define('autologin', {

        session_id: {
            type: DataTypes.STRING(32),
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING(30),
            primaryKey: true
        },
        expire_date: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
        
    },{
        timestamps: false,
        tableName: 'autologin'
    })
}