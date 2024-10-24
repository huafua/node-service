import http from "http";
export class SimpleResponse {
    /**
     * 構造方法
     * @param {http.ServerResponse} response node内置響應對象
     */
    constructor(response) {
        if (!response)
            throw "Response can't be null or undefined!";
        this.response = response;
        /**
         * @type {{[key:string]:string}} 響應頭集合
         */
        this.headers = {};

        this.statusCode = 200;
        this.statusText = "OK";
    }

    /**
     * 設置相應頭信息
     * @param {string} headerName 響應頭名稱
     * @param {string} headerValue 響應頭值
     */
    setHeader(headerName, headerValue) {
        if (!headerName || !headerValue || !headerName.trim() || !headerValue.trim())
            throw "None of headerName or headerValue can be null or empty";
        this.headers[headerName] = headerValue;
    }

    /**
     * 設定狀態碼信息
     * @param {number} code 狀態碼
     * @param {string} text 狀態文本
     */
    status(code, text) {
        code = code || this.statusCode;
        text = text || this.statusText;
        this.statusCode = code;
        this.statusText = text;
    }

    /**
     * 設定響應數據類型(Content-type)
     * @param {string} value content-type值
     */
    setContentType(value) {
        if (!value) {
            value = "text/plain;charset=utf-8";
        }
        this.setHeader("Content-type", value);
    }

    /**
     * 發送json
     * @param {{[key:string]:any}|string|boolean|number } obj 
     */
    json(obj) {
        this.setContentType("application/json;charset=utf-8");
        this.end(JSON.stringify(obj));
    }

    /**
     * 發送數據
     * @param {string} text 要發送的數據
     */
    end(text) {
        for (let key in this.headers) {
            this.response.setHeader(key, this.headers[key]);
        }
        this.response.writeHead(this.statusCode, this.statusText);
        this.response.end(text);
    }

   
}