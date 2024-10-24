import { UNAUTHORIZED, TOKEN_EXPIRED, SUCCESS } from "./consts.js"
import { randomKey } from "./common-util.js";
/**
 * 狀態管理器 
 */
export class StateManager {
    /**
     * 構造方法，用於初始化一個security對象
     */
    constructor() {
        this.security = {
            pass: null,
            lastVisit: 0,
            duration: 1000 * 60 // 有效时间1分钟
        };
    }

    /**
     * 更新狀態
     * @returns 當前管理器對象
     */
    update() {
        this.security = Object.assign(this.security, {
            pass: randomKey(),
            lastVisit: Date.now()
        });
        return this;
    }

    /**
     * 獲取當前狀態
     * @returns 當前狀態
     */
    get() {
        return this.security;
    }

    /**
     * 檢查token的合法性
     * @param {string} tk token字符串
     * @returns {UNAUTHORIZED|TOKEN_EXPIRED|SUCCESS}
     */
    check(tk) {
        if (tk && tk == this.security.pass) {
            if (this.security.lastVisit + this.security.duration < Date.now()) {
                return TOKEN_EXPIRED;
            }
            return SUCCESS;
        }
        return UNAUTHORIZED;
    }


}