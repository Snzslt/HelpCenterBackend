const express = require('express');
const app = express();
require('./middlewares/middlewares')(app);

require('./router')(app);
require('./middlewares/500')(app);
require('./middlewares/404')(app);


const runapplication = () => {
    app.listen(9000, () => {
        console.log(`app is running on port 9000`)
    })
}
module.exports = runapplication;