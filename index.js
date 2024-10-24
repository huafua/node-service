import { Server } from "./server.js";
import { TOKEN_EXPIRED, UNAUTHORIZED, SUCCESS, PORT } from "./consts.js";
import { DataManager } from "./data-manager.js";
import { StateManager } from "./state-manager.js";

const stateManager = new StateManager();
const dataManager = new DataManager();

const server = new Server(stateManager, dataManager);

server.addRoute("/token", function (req, res) {
    this.stateManager.update();
    res.json(stateManager.get());
});

server.addRoute("/example", function (req, res) {
    res.setHeader("engine", "WORLD-OF-DEVELOPER");
    res.json({
        headers: req.headers,
        query: req.query,
        method: req.method
    });
}).addRoute("/data", function (req, res) {
    let tk = req.query.token;
    let result = stateManager.check(tk);
    switch (result) {
        case TOKEN_EXPIRED:
            return res.json({
                code: 403,
                message: "Token expired, please refresh '/token' to get new token"
            });
        case UNAUTHORIZED:
            return res.json({ code: 403, text: "NOT AUTHORIZED" });
        case SUCCESS:
            return res.json(dataManager.getAll());
    }
}).addRoute("/get", function (req, res) {
    console.log(req.query);
    res.json({ success: true, message: "gotcha", query: req.query, headers: req.headers });
}).start(PORT);