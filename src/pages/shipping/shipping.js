"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Shipping() {
    (0, react_1.useEffect)(() => {
        if (window.innerWidth < 700)
            window.scrollTo(0, 130);
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'shipping', style: { textAlign: 'center' } }, { children: (0, jsx_runtime_1.jsxs)("h2", { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Currently ", (0, jsx_runtime_1.jsx)("a", Object.assign({ href: 'https://www.redbubble.com/' }, { children: "redbubble" })), " is handling all the shipping and payment processing"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["For questions contact us through our ", (0, jsx_runtime_1.jsx)("a", Object.assign({ href: 'https://t.me/ETDsupportbot' }, { children: "Telegram bot" }))] })] }) })));
}
exports.default = Shipping;
