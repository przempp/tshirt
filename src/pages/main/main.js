"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const createTshirtDirectory_1 = __importDefault(require("./components/createTshirtDirectory"));
function Main() {
    let table = (0, createTshirtDirectory_1.default)();
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "d-flex justify-content-center align-items-center flex-column " }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'menu menu-directory row justify-content-center' }, { children: table })) })) }));
}
exports.default = Main;
