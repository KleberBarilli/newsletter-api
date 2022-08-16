import mongoose, { Schema, Model } from 'mongoose';

export type UserDocument = {
	name: string;
	email: string;
	subscribed: boolean;
};

type UserModel = Model<UserDocument> & {
	findByTags(tags: string[], additional?: object): Promise<UserDocument[]>;
};

const UserSchema = new Schema(
	{
		name: String,
		email: {
			type: String,
			lowercase: true,
			trim: true,
			unique: true,
			required: true,
		},
		subscribed: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<UserDocument, UserModel>('User', UserSchema);
