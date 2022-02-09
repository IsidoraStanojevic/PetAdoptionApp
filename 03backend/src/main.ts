import * as express from "express";
import * as cors from "cors";
import Config from "./config/dev";
import AdService from './components/ad/service';
import AdController from "./components/ad/controller";

const application: express.Application = express();


application.use(cors());
application.use(express.json());

application.use(
    Config.server.static.route, 
    express.static(Config.server.static.path, {
    index:Config.server.static.index,
    cacheControl:Config.server.static.cacheControl,
    maxAge: Config.server.static.maxAge,
    etag:Config.server.static.etag,
    dotfiles: Config.server.static.dotfiles,    
}),

);

const adService: AdService= new AdService();
const adController: AdController = new AdController(adService);

application.get("/ad", adController.getAll.bind(adController));
application.get("/ad/:id", adController.geById.bind(adController));

application.use((req, res) => {

    res.sendStatus(404);
});

application.listen(Config.server.port);
