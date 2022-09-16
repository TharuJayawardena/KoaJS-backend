const Router = require('koa-router');
const subject = require('../models/subject');
const router = new Router({
    prefix: '/subject'
})

router.post('/', async ctx => {
  try { 
    
    const {moduleId,moduleName,duration,lectureIds,acedemicYear} = ctx.request.body;
    const dbResult = new subject({moduleId,moduleName,duration,lectureIds,acedemicYear});
    await dbResult.save();
    ctx.response.status = 201;
    ctx.response.body = {
        message: 'successfully added'
    };
    console.log(dbResult);
  } catch (e){
    
    ctx.response.status = 400;
    ctx.response.body = {
        message: "error occured"
    }
  }
})

router.get('/', async ctx => {
    try{

       const dbResult = await subject.find();
       ctx.response.status = 200;
       ctx.response.body = dbResult;

    } catch (e){
       
        ctx.response.status = 400;
        ctx.response.body = {
            message: 'error occured'
        }
    }
})

router.get('/:id', async ctx => {
    try{
       const {id} = ctx.params;
       const dbResult=  await subject.findById(id);
       ctx.response.status = 200;
       ctx.response.body = dbResult;

    } catch (e){
        ctx.response.status = 400;
        ctx.response.body = {
            message: 'error'
        }
    }
})

router.put('/:id', async ctx => {
    try {
          const  {id} = ctx.params;
          const {moduleName,duration,lectureIds,acedemicYear} = await subject.findByIdAndUpdate(id, ctx.request.body , {new:true});
          ctx.response.status = 200;
          ctx.response.body = ({moduleName,duration,lectureIds,acedemicYear});

    } catch (e) {
          ctx.response.status = 400;
          ctx.response.body = {
            message: 'error'
          }
    }
})

router.delete('/:id', async ctx => {
    try {
       const {id} = ctx.params;
       await subject.findByIdAndRemove(id);

       ctx.response.status = 200;
       ctx.response.body = {
        message: 'deleted'
       }


    } catch (e) {
           
        ctx.response.status = 400;
        ctx.response.body = e
    }
})

module.exports = router;