import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import { connectBD } from './services/database.service';

// Set up origin to avoid CORS issue when requesting the API
// And not using '*' to fit the OWASP recommandations
const corsOptions: cors.CorsOptions = {
    origin: [String(process.env.CLIENT)]
}

class App {

    public app: express.Application;
    public port: number;

    constructor(controllers: Controller[], port: number){

        this.app = express();
        this.port = port;
        
        // Using middlewares
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(errorMiddleware);

        // Initialize database
        connectBD();

        controllers.map((controller: Controller) => {
            this.app.use('/', controller.router) 
        }); 
    }

    public getServer(){
        return this.app;
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on ${this.port}`);
        });
    }
}

export default App;