import http from "http";
import { DataManager } from "./data-manager.js";
import { StateManager } from "./state-manager.js";
import { SimpleRequest } from "./simple-request.js";
import { SimpleResponse } from "./simple-response.js";

/**
 * Web服務器
 */
export class Server {
    /**
     * 構造方法
     * @param {StateManager} stateManager 狀態管理器
     * @param {DataManager} dataManager 數據管理器
     */
    constructor(stateManager, dataManager) {
        if (!stateManager || !dataManager) {
            throw "Neither of StateManager or DataManager can be null!";
        }
        this.stateManager = stateManager;
        this.dataManager = dataManager;
        /**
         * @type {{[key:string]:RouteCallback}}
         */
        this.routes = {};
    }

    /**
     * 添加路由
     * @param {string} pathname 路由路徑
     * @param {RouteCallback} callback 路由回調
     * @returns {Server}
     */
    addRoute(pathname, callback) {
        if (!callback || typeof (callback) != "function") {
            throw "Callback must be instance of RouteCallback!";
        }
        this.routes[pathname] = callback;
        return this;
    }

    /**
     * 啓動`web`服務器
     * @param {number} port 監聽端口
     */
    start(port) {
        http.createServer((req, res) => {
            let request = new SimpleRequest(req);
            let response = new SimpleResponse(res);
            /**
             * 
             */
            let callback = this.routes[request.path];
            if (!callback) {
                res.writeHead(404, "Not found!");
                return res.end();
            }
            callback.call(this, request, response);
        }).listen(port, () => {
            console.log(`Server running at ${port}`);
        });
    }
}
