import express from 'express';
import cookieParser from 'cookie-parser';
import {PORT} from "./config/env.js";
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import subscriptionsRoutes from "./routes/subscriptions.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();
await connectToDatabase();
const port = process.env.PORT || PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/subscriptions', subscriptionsRoutes)
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware);




app.get('/',async (req, res) => {
    res.send('Welcome to subscription tracking APIs')
})

app.listen(port, () => console.log(`server running on port http://localhost:${PORT}!`))

export default app;

