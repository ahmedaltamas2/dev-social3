const mongoose = require('mongoose');
const config = require('config'); //dependency
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected');
	} catch (err) {
		console.error(err.message);
		
	}
};

module.exports = connectDB;
