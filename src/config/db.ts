import mongoose from "mongoose";
import logger from "./logger";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || '');
        console.log('Connected to MongoDB');
    } catch (err:any) {
        logger.error('Error connecting to DB: ' + err.message);
        process.exit(1);
    }
};

export default connectToDatabase