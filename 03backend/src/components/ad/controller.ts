import AdService from './service';
import {Request, Response, NextFunction} from "express";


class AdController{
    private adService:AdService;

    constructor(adService:AdService){
        this.adService=adService;

    }   

    async getAll(req: Request, res:Response, next:NextFunction){
       const ads= await  this.adService.getAll();
       res.send(ads);
    }
    
}

export default AdController;