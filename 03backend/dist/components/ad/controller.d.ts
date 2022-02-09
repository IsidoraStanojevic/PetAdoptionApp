import AdService from './service';
import { Request, Response, NextFunction } from "express";
declare class AdController {
    private adService;
    constructor(adService: AdService);
    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AdController;
