import { Router, Request, Response } from 'express';
import {
  Register,
  Login,
  Logout,
} from '../../controllers/Auth/Auth.controller';
import { ValidateUser } from '../../middleware/Auth.middleware';


const AuthRouter = Router();

AuthRouter.route('/register').post(
  Register as (req: Request, res: Response) => void
);

AuthRouter.route('/login').post(Login as (req: Request, res: Response) => void);
AuthRouter.route('/logout').post(
  ValidateUser as any,
  Logout as (req: Request, res: Response) => void
);

export default AuthRouter;
