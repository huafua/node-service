import { randomUUID } from "crypto";
import { SimpleRequest } from "./simple-request.js";
import { SimpleResponse } from "./simple-response.js";


export class UserItem {
    /**
     * 全參構造方法
     * @param {string} id id
     * @param {string} username 用戶名
     * @param {string} gender 性別
     * @param {number} age 年齡
     */
    constructor({ id, username, gender, age }) {
        /**
         * @type {string|null}
         */
        this.id = id || randomUUID();
        this.username = username;
        this.gender = gender;
        this.age = age;
    }
}

export class ActionResult {

    /**
     * 構造方法
     * @param {number} code 狀態碼
     * @param {string} message 説明
     * @param {boolean} success 是否成功
     * @param {object} data 數據
     */
    constructor({ code, message, success, data }) {
        this.code = code;
        this.message = message;
        this.success = success;
        this.data = data;
    }
}
