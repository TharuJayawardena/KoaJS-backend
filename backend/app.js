const koa = require('koa');
const app = new koa();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');


app.use(cors());
app.use(bodyParser());

const userRoute = require('./routes/userRoute');
const subjectRoute = require('./routes/subjectRoute');
const timetableRoute = require('./routes/timetableRoute');
const initDB = require('./db/mongoClient');

app.use(userRoute.routes()).use(userRoute.allowedMethods());
app.use(subjectRoute.routes()).use(subjectRoute.allowedMethods());
app.use(timetableRoute.routes()).use(timetableRoute.allowedMethods());
initDB();
app.listen(5000);

