import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 8000;
const app: Express = express();

// Set up origin to avoid CORS issue when requesting the API
// And not using '*' to fit the OWASP recommandations
const corsOptions: cors.CorsOptions = {
    origin: [String(process.env.CLIENT)]
}
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello from TypeScript server</h1>');
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));