const Router = require('koa-router');
const timetable = require('../models/timetable');
const router = new Router ({
    prefix: '/time'
});

router.post('/', async ctx => {
   try 
    {
    const {moduleName,allocatedTime} = ctx.request.body;
    const dbResult = new timetable({moduleName,allocatedTime});
    await dbResult.save();
    ctx.response.status = 201;
    ctx.respond.body = {
        message: 'successfully allocated time'
    };
    console.log(dbResult);
    } catch (e){
        ctx.response.status = 400;
        ctx.response.body = {
            message: 'error occured'
        }
    }

})

module.exports = router;