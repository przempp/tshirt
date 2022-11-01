"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_loading_1 = __importDefault(require("react-loading"));
function Spinner() {
    return ((0, jsx_runtime_1.jsx)(react_loading_1.default, { className: 'loading-status', type: 'spinningBubbles', color: 'grey' }));
}
exports.default = Spinner;
