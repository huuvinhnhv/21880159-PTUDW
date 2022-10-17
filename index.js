let express = require('express');
let app = express();

//set sever port and start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});