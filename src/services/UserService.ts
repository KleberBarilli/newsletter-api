import UserModel from '../schemas/User';
import UnsubModel from '../schemas/Unsub';
import { IUser } from '../interfaces/IUser';

export default class UserService {
	private userRepository;
	private unsubRepository;
	constructor() {
		this.userRepository = UserModel;
		this.unsubRepository = UnsubModel;
	}

	async cadastrar(payload: IUser) {
		return this.userRepository.create(payload);
	}
	async findOne(email: string) {
		return await this.userRepository.findOne({ email });
	}
	async unsubscribe(email: string, reason: string) {
		const user = await this.userRepository.findOneAndUpdate(
			{ email },
			{ subscribed: false },
		);
		return this.unsubRepository.create({
			email,
			reason,
			userId: user?._id,
		});
	}
	findAll() {
		return Promise.all([
			this.userRepository.count({ subscribed: true }),
			this.userRepository.find({ subscribed: true }),
		]);
	}
}
