import mongoose from 'mongoose';

export default () => {
	mongoose.set('strictQuery', false);
};
