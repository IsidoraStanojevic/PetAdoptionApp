"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const dev_1 = require("./config/dev");
const service_1 = require("./components/ad/service");
const controller_1 = require("./components/ad/controller");
const application = express();
application.use(cors());
application.use(express.json());
application.use(dev_1.default.server.static.route, express.static(dev_1.default.server.static.path, {
    index: dev_1.default.server.static.index,
    cacheControl: dev_1.default.server.static.cacheControl,
    maxAge: dev_1.default.server.static.maxAge,
    etag: dev_1.default.server.static.etag,
    dotfiles: dev_1.default.server.static.dotfiles,
}));
const adService = new service_1.default();
const adController = new controller_1.default(adService);
application.get("/ad", adController.getAll.bind(adController));
application.use((req, res) => {
    res.sendStatus(404);
});
application.listen(dev_1.default.server.port);
//# sourceMappingURL=main.js.map