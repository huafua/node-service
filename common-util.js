/**
    * 生成自定長度的字符串
    * @param {number} len 目標字符串的長度
    * @returns 生成的字符串
    */
export function randomKey(len) {
    len = len || 20;
    let key = "";
    const fullCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    while (key.length < len) {
        key += fullCharacters[Math.round(Math.random() * fullCharacters.length)];
    }
    return key;
}