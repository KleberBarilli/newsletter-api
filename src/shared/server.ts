import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '../shared/errors/AppError';
import mongoose from '../database/mongoose';
import userRoutes from '../routes/user.routes';

mongoose();
const app = express();

app.use(express.json());
app.use(cors());
app.use(errors());
app.use('/user', userRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}
	return res.status(500).json({
		status: 'error',
		message: error.message,
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Rodando na porta ${process.env.PORT}`);
	console.log(`Ambiente ${process.env.NODE_ENV}`);
});
