"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var dev_1 = require("./config/dev");
var router_1 = require("./components/ad/router");
var application = express();
application.use(cors());
application.use(express.json());
application.use(dev_1["default"].server.static.route, express.static(dev_1["default"].server.static.path, {
    index: dev_1["default"].server.static.index,
    cacheControl: dev_1["default"].server.static.cacheControl,
    maxAge: dev_1["default"].server.static.maxAge,
    etag: dev_1["default"].server.static.etag,
    dotfiles: dev_1["default"].server.static.dotfiles
}));
router_1["default"].setupRoutes(application);
application.use(function (req, res) {
    res.sendStatus(404);
});
application.listen(dev_1["default"].server.port);
