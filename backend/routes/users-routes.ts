import {Router} from 'express';

const router = Router();

router.get('/', (req,res,next)=> {
    console.log("GET req in Users");
    res.json({message:"It works"});
})

module.exports = router;