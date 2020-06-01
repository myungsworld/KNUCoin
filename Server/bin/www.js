const app = require('../app/app')
const port = 3000
const database = require('../data')

app.listen(port, () => {
    console.log('Connected Server to port', port)

    database.sequelize.sync().then( () => {
        console.log('Database Sync')
    })

})