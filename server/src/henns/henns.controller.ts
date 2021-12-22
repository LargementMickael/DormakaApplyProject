import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { connectBD } from '../services/database.service';
import Henn from './henn.interface';
import hennsModel from './henns.model';
import HttpException from '../exceptions/HttpException';

class HennController implements Controller {

    public path: string = '/';
    public router: express.Router = express.Router();
    private henns = hennsModel;

    constructor(){  

        // First of all, connect DB to avoid no results
        // Then, load datas before creating endpoints 
        connectBD()
        .then(() => {
            this.initRoutes();
        });
    } 

    initRoutes(){
        this.router.get(this.path, this.getAllHenns);
        this.router.post(this.path, this.createHenn);
        this.router.patch(this.path, this.updateHenn);
    }

    getAllHenns = async (req: Request, res: Response) => {
        this.henns.find().then((results) => {
            console.log(results);
            res.status(200).json(results);
        });
    }

    createHenn = async (req: Request, res: Response, next: NextFunction) => {
        const postData: Henn = req.body;
        const createdHenn = new this.henns(postData);
        createdHenn.save()
        .then((successResponse) => {
            if(successResponse){
                next(new HttpException(355, 'Error while creating new henn'));
            }else{
                console.log(successResponse);
            }
        })
    }

    updateHenn = async (req: Request, res: Response) => {
        const id = req.params.id;
        const postData: Henn = req.body;
        this.henns.findByIdAndUpdate(id, postData, { new: true })
        .then((henn) => {
            res.status(200).send(henn);
        })
    }
}

export default HennController;