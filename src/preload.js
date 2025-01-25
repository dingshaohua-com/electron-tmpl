
const remote = require("@electron/remote");


const watermarkPath = remote.getGlobal("watermarkPath");
window.$electron = {
    watermarkPath
};