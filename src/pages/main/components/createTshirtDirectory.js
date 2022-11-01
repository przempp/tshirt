"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const queries_1 = require("../../../data/queries");
const Select_Print_Front_and_Back_png_1 = __importDefault(require("../../../assets/Select Print Front and Back.png"));
const react_router_dom_1 = require("react-router-dom");
const spinner_1 = __importDefault(require("../../../components/spinner/spinner"));
function CreateTshirtDirectoryNew() {
    const { loading, error, data } = (0, client_1.useQuery)(queries_1.GET_COLLECTIONS);
    if (loading)
        return (0, jsx_runtime_1.jsx)(spinner_1.default, {});
    if (error)
        return (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'loading-status' }, { children: "Error :(" }));
    let tshirtDirectory;
    tshirtDirectory = [];
    data.collections.items.forEach((collections, i) => {
        collections.productVariants.items.forEach((products, i) => {
            if (i === 0 && collections.name) {
                tshirtDirectory.push((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'menu-item col-md-12 ' }, { children: [(0, jsx_runtime_1.jsx)("hr", { className: 'border-top border-bottom border-dark mb-4 directory-hr' }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "" }, { children: collections.name })), (0, jsx_runtime_1.jsx)("hr", { className: 'border-top border-bottom border-dark mb-5 directory-hr ' })] })));
            }
            tshirtDirectory.push(SetTable(products));
            // console.log(collections.name)
            if (i === 7 && collections.name === 'Original') {
                tshirtDirectory.push((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'directory-sticker menu-item col-md-6 col-lg-4 align-self-center' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'col-sm ' }, { children: (0, jsx_runtime_1.jsx)("img", { alt: 'product', className: 'directory-tshirt tshirt-shadow animation', src: Select_Print_Front_and_Back_png_1.default }) })) })));
            }
        });
    });
    return tshirtDirectory;
    function SetTable(item) {
        let table = [];
        table.push((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'menu-item  col-md-6 col-lg-4' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { minHeight: `250px` }, className: 'col-sm tshirt-div' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: '/tshirts/' + item.product.slug }, { children: (0, jsx_runtime_1.jsx)("img", { alt: 'product', className: `directory-tshirt tshirt-shadow`, src: `${item.featuredAsset.preview}?preset=large&format=webp` }) })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-sm menu-tshirt-desc' }, { children: [(0, jsx_runtime_1.jsx)("p", Object.assign({ className: "menu-tshirt-desc-name" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ to: '/tshirts/' + item.product.slug }, { children: [" ", item.product.name] })) })), (0, jsx_runtime_1.jsxs)("p", { children: [(item.price / 100), "$"] })] }))] })));
        return table;
    }
}
exports.default = CreateTshirtDirectoryNew;
