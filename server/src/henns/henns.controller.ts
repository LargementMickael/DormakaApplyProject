import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import Henn from './henn.interface';
import hennsModel from './henns.model';
import HttpException from '../exceptions/HttpException';

class HennController implements Controller {

    public path: string = '/henns';
    public router: express.Router = express.Router();
    private henns = hennsModel;

    constructor(){  
        // First of all, connect DB to avoid no results
        // Then, load datas before creating endpoints 
        this.initRoutes();
    } 

    initRoutes(){
        this.router.get(this.path, this.getAllHenns);
        this.router.post(this.path, this.createHenn);
        this.router.patch(`${this.path}/:id`, this.updateHenn);
        console.log('> Routes are loaded');
    }

    getAllHenns = async (req: Request, res: Response) => {
        console.log(">> Accessing GET/");
        this.henns.find().then((results) => {
            res.status(200).json(results);
        });
    }

    createHenn = async (req: Request, res: Response, next: NextFunction) => {
        new hennsModel(req.body).save()
        .then(result => res.status(200).send(result))
        .catch(err => next(new HttpException(400, err.message)))
    }

    updateHenn = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const postData: Henn = req.body;
        this.henns.findByIdAndUpdate(id, postData, { new: true })
        .then(result => res.status(200).send(result))
        .catch(err => next(new HttpException(400, err.message)))
    }
}

export default HennController;