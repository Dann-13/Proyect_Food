import express from "express";
import bodyParser from "body-parser"; // Importa el módulo body-parser
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/product.routes.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
app.use(morgan('dev'));

// Utiliza directamente bodyParser.json() y bodyParser.urlencoded()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api', postRoutes);
export default app;