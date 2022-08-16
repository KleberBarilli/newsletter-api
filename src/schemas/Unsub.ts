import mongoose, { Schema, Model } from 'mongoose';

export type UnsubDocument = {
	userId: string;
	reason: string;
};
type UnsubModel = Model<UnsubDocument> & {
	findByTags(tags: string[], additional?: object): Promise<UnsubDocument[]>;
};

const UnsubSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		reason: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<UnsubDocument, UnsubModel>('Unsub', UnsubSchema);
