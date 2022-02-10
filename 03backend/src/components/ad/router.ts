import * as express from "express";
import AdService from './service';
import AdController from "./controller";
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

export default class AdRouter implements IRouter {
  public setupRoutes(application: express.Application, resources: IApplicationResources) {
    const adService: AdService = new AdService(resources.databaseConnection);
    const adController: AdController = new AdController(adService);

    application.get("/ad",        adController.getAll.bind(adController));
    application.get("/ad/:id",    adController.geById.bind(adController));
   
  }
}

