import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import { AuthRouter, requireAuth } from './auth.router';

const router: any = Router();

router.use('/auth', AuthRouter);

router.get('/', async (req: any, res: any) => {
});

router.get('/:id', async (req: any, res: any) => {
    let { id } = req.params;
    const item = await User.findByPk(id);
    res.send(item);
});

export const UserRouter: Router = router;