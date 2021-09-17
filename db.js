const mongoose = require('mongoose');

exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log('Mobgodb Connected');
  } catch (error) {
    console.log(error);
  }
};
