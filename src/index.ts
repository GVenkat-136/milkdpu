import express, { Application} from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db';
import { errorHandler } from './config/errorHandler';
import routes from './routes';

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use('/api',routes)

app.use(errorHandler)


// Start the server after connecting to the database
const startServer = async () => {
    await connectToDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
