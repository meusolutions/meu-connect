var md5 = require('md5');

const encryptPassword = "@123RAPTOR!@#&^";

export default function encryptData(data) {
    const stringifiedData = JSON.stringify(data).toLocaleLowerCase() + encryptPassword;
    return md5(stringifiedData);
};
