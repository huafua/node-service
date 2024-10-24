# 項目介紹

只是一個很簡單的基於`node`的項目，先獲取`token`，再獲取數據

## 1. 幾個關鍵類

-   `DataManager`：簡單的數據管理工具
    -   `getAll()`：獲取全部數據
    -   `add(item)`：新增一筆記錄
    -   `getById(id)`：根據指定`id`查詢
    -   `save()`：保存數據
    -   `deleteById(id)`：刪除指定`id`的記錄
    -   `updateById(id, updateOption)`：更新指定`id`的記錄
-   `StateManager`：管理`token`的工具類
    -   `update()`：更新`token`的狀態
    -   `get()`：獲取`token`
    -   `check(tk)`：檢查`token`的合法性
-   `SimpleRequest`：簡單的`Request`，對`http.IncomingMessage`進行封裝
    -   `query`：所有查詢對象(`querystring`)
    -   `path`：請求路徑，即`pathname`
    -   `method`：請求方式，`GET`、`POST`等
    -   `headers`：請求頭
-   `SimpleResponse`：簡單的`Response`，對`http.ServerResponse`進行封裝
    -   `setHeader(headerName,headerValue)`：設置響應頭
    -   `status(code, text)`：設置狀態碼信息
    -   `setContentType(value)`：設置響應數據類型
    -   `json(obj)`：發送`json`對象
    -   `end(text)`：發送數據
-   `Server`：簡單的服務，只處理符合指定`path`的請求，不關心請求方式為`GET`還是其他
    -   `addRoute(pathname, callback)`：添加路由及處理器
    -   `start(port,startedCallback)`：啓動服務

## 2. 簡單示例

```js
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

server
    .addRoute("/example", function (req, res) {
        res.setHeader("engine", "WORLD-OF-DEVELOPER");
        res.json({
            headers: req.headers,
            query: req.query,
            method: req.method,
        });
    })
    .addRoute("/data", function (req, res) {
        let tk = req.query.token;
        let result = stateManager.check(tk);
        switch (result) {
            case TOKEN_EXPIRED:
                return res.json({
                    code: 403,
                    message:
                        "Token expired, please refresh '/token' to get new token",
                });
            case UNAUTHORIZED:
                return res.json({ code: 403, text: "NOT AUTHORIZED" });
            case SUCCESS:
                return res.json(dataManager.getAll());
        }
    })
    .addRoute("/get", function (req, res) {
        console.log(req.query);
        res.json({
            success: true,
            message: "gotcha",
            query: req.query,
            headers: req.headers,
        });
    })
    .start(PORT, function () {
        console.log(this);
    });
```
