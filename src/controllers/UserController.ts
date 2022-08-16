import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
	service;

	constructor() {
		this.service = new UserService();
	}
	async cadastrar(req: Request, res: Response) {
		try {
			const { name, email } = req.body;
			const existsUser = await this.service.findOne(email);
			if (!existsUser) {
				await this.service.cadastrar({ name, email });
			}
			return res.json({
				message: 'Você se cadastrou na newsletter com sucesso!',
			});
		} catch (error) {
			return res.status(400).json({
				message: 'Não foi possível cadastrar',
			});
		}
	}
	async unsubscribe(req: Request, res: Response) {
		try {
			const { email, reason } = req.body;
			const existsUser = await this.service.findOne(email);
			if (!existsUser) {
				return res
					.status(400)
					.json({ error: 'Usuário não encontrado' });
			}
			const payload = await this.service.unsubscribe(email, reason);

			if (!payload) {
				return res
					.status(400)
					.json({ error: 'Não foi possível atualizar' });
			}
			return res.json({ data: payload });
		} catch (error) {
			return res
				.status(400)
				.json({ error: 'Não foi possível atualizar' });
		}
	}
	async findAll(req: Request, res: Response): Promise<Response> {
		const [count, users] = await this.service.findAll();

		return res.json({ count, data: users });
	}
}
