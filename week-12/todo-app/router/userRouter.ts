import expres from 'express';
import { userSignInCtrl, userSignUpCtrl } from '../controller/userCtrl';

const userRouter = expres.Router();

userRouter.post('/signup', userSignUpCtrl);
userRouter.post('/signin', userSignInCtrl);

export default userRouter;