import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';

const userRouter = Router();
const controller = new UserController();

userRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			name: Joi.string(),
			email: Joi.string().email().required(),
		},
	}),
	controller.cadastrar.bind(controller),
);
userRouter.post(
	'/unsubscribe',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			reason: Joi.string(),
		},
	}),
	controller.unsubscribe.bind(controller),
);
userRouter.get('/', controller.findAll.bind(controller));

export default userRouter;
