import express from 'express';
import { FollowerControllers } from './follower.controller';

const router = express.Router();

router.post('/follow', FollowerControllers.followUser);

router.get('/:id', FollowerControllers.getAllFollowers);

router.get('/:id', FollowerControllers.gelFollowing);

export const FollowerRoutes = router;
