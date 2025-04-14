import { Router, Request, Response } from 'express';
import {
  Register,
  Login,
  Logout,
} from '../../controllers/Auth/Auth.controller';

const AuthRouter = Router();

AuthRouter.route('/register').post(
  Register as (req: Request, res: Response) => void
);

AuthRouter.route('/login').get(Login as (req: Request, res: Response) => void);
AuthRouter.route('/logout').post(
  Logout as (req: Request, res: Response) => void
);

export default AuthRouter;
