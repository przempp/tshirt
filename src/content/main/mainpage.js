"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tshirtInformation_1 = __importDefault(require("../data/tshirtInformation"));
const Select_Print_Front_and_Back_png_1 = __importDefault(require("../../image/Select Print Front and Back.png"));
const react_router_dom_1 = require("react-router-dom");
// @ts-expect-error TS(2307): Cannot find module 'react-tooltip' or its correspo... Remove this comment to see the full error message
const react_tooltip_1 = __importDefault(require("react-tooltip"));
function createTshirtDirectory() {
    let tshirtDirectory;
    tshirtDirectory = [];
    tshirtInformation_1.default.forEach((tshirt, i) => {
        if (i === 8) {
            tshirtDirectory.push((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'directory-sticker menu-item col-md-4 align-self-center' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'col-sm ' }, { children: (0, jsx_runtime_1.jsx)("img", { className: 'directory-tshirt animation', src: Select_Print_Front_and_Back_png_1.default }) })) })));
        }
        if (i === 8) {
            tshirtDirectory.push((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'menu-item col-md-12 ' }, { children: [(0, jsx_runtime_1.jsx)("hr", { className: 'border-top border-bottom border-dark mb-4 directory-hr' }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "" }, { children: "COMMUNITY PICKS" })), (0, jsx_runtime_1.jsx)("hr", { className: 'border-top border-bottom border-dark mb-5 directory-hr ' })] })));
        }
        tshirtDirectory.push((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'menu-item col-md-4' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'col-sm' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: '/tshirts/' + tshirt.name.replace(/ /g, '_').toLowerCase() }, { children: (0, jsx_runtime_1.jsx)("img", { className: 'directory-tshirt', src: tshirt.img }) })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-sm menu-tshirt-desc' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "menu-tshirt-desc-name" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: '/tshirts/' + tshirt.name.replace(/ /g, '_').toLowerCase() }, { children: [" ", tshirt.name] })) })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ "data-place": "bottom", "data-offset": "{'top': 30}", clickable: "true", "data-effect": "solid", "data-tip": "+10$ for shipping outside EU" }, { children: [tshirt.price, "$ incl. Shipping*"] }))] }))] })));
    });
    return tshirtDirectory;
}
function TshirtsDirectory() {
    let table = createTshirtDirectory();
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_tooltip_1.default, {}), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "d-flex justify-content-center align-items-center flex-column " }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'menu menu-directory row' }, { children: table })) }))] }));
}
exports.default = TshirtsDirectory;
