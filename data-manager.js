import { ActionResult, UserItem } from "./models.js";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";


/**
 * 數據管理器
 */
export class DataManager {

    constructor() {
        /**
         * 文件路徑
         * @type {string}
         */
        this.file = path.join(".", "data.json");
        /**
         * @type {UserItem[]}
         */
        this.data = [];
        this.init();
    }
    /**
     * 獲取全部數據
     * @returns {UserItem[]} 數據
     */
    getAll() {
        return new ActionResult({
            code: 200, message: "OK", success: true, data: this.data
        });
    }

    /**
     * 初始化數據
     */
    init() {
        if (fs.existsSync(this.file)) {
            /**
             * @type {{username:string;gender:string;age:number}[]}
             */
            const configs = JSON.parse(fs.readFileSync(this.file).toString());
            this.data = configs.map(config => new UserItem({...config}));
        } else {
            this.save();
        }

    }

    /**
     * 新增一筆記錄
     * @param {UserItem} item 要添加的項目
     */
    add(item) {
        /**
         * 因爲是新增的，所以直接將id覆蓋
         */
        item = Object.assign(item, { id: randomUUID() });
        this.data.push(item);
        this.save();
    }

    /**
     * 根據id查詢
     * @param {string} id id
     * @returns {UserItem} 符合條件的記錄
     */
    getById(id) {
        return this.data.find(item => item.id == id);
    }

    /**
     * 保存數據
     * @returns {boolean} 保存數據是否成功
     */
    save() {
        try {
            fs.writeFileSync(this.file, JSON.stringify(this.data));
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 刪除指定id的記錄
     * @param {string} id 要刪除的記錄id
     */
    deleteById(id) {
        this.data = this.data.filter(item => item.id != id);
        this.save();
    }

    /**
     * 更新指定id的記錄
     * @param {string} id 要更新的記錄id
     * @param {[key]:string|number|boolean} updateOption 更新選項
     * @returns {boolean} 更新是否成功
     */
    udpateById(id, updateOption) {
        if (!this.getById(id)) {
            //沒有找到對應的記錄
            return false;
        }

        let item = this.getById(id);
        // 這裏可不能用item=Object.assign(item,updateOption);
        item.age = updateOption.age || item.age;
        item.username = updateOption.age || item.username;
        item.gender = updateOption.age || item.gender;

        this.save();
        return true;
    }
}


