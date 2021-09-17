import {Router} from 'express';
import { getPlaceById, getPlaceByUserId } from '../controllers/places-controller';

const router = Router();

router.get('/:pid', getPlaceById)

router.get('/user/:uid', getPlaceByUserId)

module.exports = router;