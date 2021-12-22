import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

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
        
        this.initializeMiddleware();
        this.initControllers(controllers);
    }

    private initializeMiddleware(){
        this.app.use(bodyParser.json());
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
    }
    
    private initControllers(controllers: any){
        controllers.map((controller: any) => {
            this.app.use('/', controller.router) 
        }); 
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on ${this.port}`);
        });
    }
}

export default App;