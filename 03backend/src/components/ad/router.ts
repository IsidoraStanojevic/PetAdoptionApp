import * as express from "express";
import AdService from './service';
import AdController from "./controller";

export default class AdRouter {
  public static setupRoutes(application: express.Application) {
    const adService: AdService = new AdService();
    const adController: AdController = new AdController(adService);

    application.get("/ad",        adController.getAll.bind(adController));
    application.get("/ad/:id",    adController.geById.bind(adController));
   
  }
}

