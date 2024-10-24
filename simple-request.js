import http from "http";
import querystring from "querystring";
import url from "url";

export class SimpleRequest {
    /**
     * 構造方法
     * @param {http.IncomingMessage} request http内置請求對象
     */
    constructor(request) {
        if (!request) {
            throw "Request can't be null or undefined!";
        }
        this.request = request;
        this.urlObject = url.parse(request.url);
    }

    get query() {
        return querystring.parse(this.urlObject.query);
    }

    get path() {
        return this.urlObject.pathname;
    }

    get method() {
        return (this.request.method || "method").toUpperCase();
    }

    get headers() {
        return this.request.headers;
    }
}