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
        this.initRoutes();
    } 

    initRoutes(){
        this.router.get(this.path, this.getAllHenns);
        this.router.post(this.path, this.createHenn);
        this.router.patch(`${this.path}/:id`, this.updateHenn);
    }

    getAllHenns = async (req: Request, res: Response) => {
        this.henns.find().then((results) => {
            res.status(200).json(results);
        });
    }

    createHenn = async (req: Request, res: Response, next: NextFunction) => {
        var payload: Henn = {
            name: req.body.name,
            breed: req.body.breed,
            imageUrl: req.body.imageUrl
        }
        new hennsModel(payload).save()
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