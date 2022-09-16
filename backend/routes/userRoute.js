const Router = require('koa-router');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const SALT_WORK_FACTOR = 10;
const router = new Router({
    prefix: '/user'
});


router.post('/register', async ctx => {
    try {
        const { userId, userName, email, password, userType } = ctx.request.body;

        const dbResult = new User({ userId, userName, email, password, userType });
        await dbResult.save();
        ctx.response.status = 201;
        ctx.response.body = {
            message: 'Successfully registered'
        };
        console.log(dbResult);
    } catch (e) {
        ctx.response.status = 400;
        ctx.response.body = {
            message: 'Error occured',
            error: e
        }
    }

})

router.post('/login', async ctx => {
    try {
        const { email, password } = ctx.request.body;
        const dbResult = await User.findOne({ email });


        const isPasswordMatch = bcrypt.compareSync(password, dbResult.password)
        if (!isPasswordMatch) {
            ctx.response.status = 400;
            ctx.response.body = {
                message: 'invalid password, please check your password',
                error: e
            }
        }
        else {
            ctx.response.status = 200;
            ctx.response.body = {
                success: true,
                userName: dbResult.userName,
                email: dbResult.email,
                userType: dbResult.userType,
            }
        }
    } catch (e) {
        ctx.response.status = 400;
        ctx.response.body = {
            message: 'Error occured',
            error: e
        }
    }


})
router.get('/type', async ctx => {
    try {
     
     const {userType} = ctx.request.query;
     const dbResult =   await User.find({userType:userType.trim()});
     console.log(dbResult);
     ctx.response.status = 200;
     ctx.response.body = dbResult.map(x=>{
        return {
            id:x._id,
            email: x.email
        }
     });
     } catch (e) {
         ctx.response.status = 400;
         ctx.response.body = {
             message: 'error occured'
         }
     }
 })
router.get('/', async ctx => {
    try {
        const dbResult = await User.find();
        ctx.response.status = 200;
        ctx.response.body = dbResult;
    } catch (e) {
        ctx.response.status = 400;
        ctx.response.body = e;
    }
})

router.get('/:id', async ctx => {
 try {   const { id } = ctx.params;
    const dbResult = await User.findById(id);
    ctx.response.status=200;
    ctx.response.body = dbResult;
} catch (e){
    ctx.response.status = 400;
    ctx.response.body = e
}

})



router.put('/:id', async ctx => {
    try {
        const { id } = ctx.params;
        const { userId, userName, email, userType } = await User.findByIdAndUpdate(id, ctx.request.body, { new: true });
        ctx.response.status = 200;
        ctx.response.body = ({ userId, userName, email, userType });

    } catch (e) {
        ctx.response.status = 400;
        ctx.response.body = {
            message: 'error occured'
        }
    }
})

//delete student/lecture profile
router.delete('/:id', async ctx => {

    try {
        const { id } = ctx.params;
        await User.findByIdAndRemove(id);
        ctx.response.status = 200;
        ctx.response.body = {
            message: "deleted"
        }
    } catch (e) {
        ctx.response.status = 400;
        ctx.response.body = e;
    }

})

module.exports = router;


