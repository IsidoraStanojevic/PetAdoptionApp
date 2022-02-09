import AdService from './service';
import {Request, Response, NextFunction} from "express";
import AdModel from '../../../dist/components/ad/model';


class AdController{
    private adService:AdService;

    constructor(adService:AdService){
        this.adService=adService;

    }   

    async getAll(req: Request, res:Response, next:NextFunction){
       const ads= await  this.adService.getAll();
       res.send(ads);
    }

    async geById(req: Request, res:Response, next:NextFunction){
        const id: string = req.params.id;

        const adId: number = +id;

         if(adId <= 0){
             res.sendStatus(400);
             return;
         }

        
        const ad: AdModel|null= await  this.adService.getById(adId);
       
        if (ad === null){
            res.sendStatus(404);
            return;
        }
       
        res.send(ad);
     }
    
}

export default AdController;