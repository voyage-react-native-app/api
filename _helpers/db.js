import mongoose from 'mongoose';

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

const connectToDb = () => {
    return mongoose
        .connect(process.env.DB_URI, connectionOptions)
        .then(console.log('DB connected!'))
        .catch(err => console.log(err))
};

export default connectToDb;

