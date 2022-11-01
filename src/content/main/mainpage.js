import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import tshirts from "../data/tshirtInformation";
import selectPrint from "../../image/Select Print Front and Back.png";
import { Link } from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module 'react-tooltip' or its correspo... Remove this comment to see the full error message
import ReactTooltip from 'react-tooltip';
function createTshirtDirectory() {
    let tshirtDirectory;
    tshirtDirectory = [];
    tshirts.forEach((tshirt, i) => {
        if (i === 8) {
            tshirtDirectory.push(_jsx("div", Object.assign({ className: 'directory-sticker menu-item col-md-4 align-self-center' }, { children: _jsx("div", Object.assign({ className: 'col-sm ' }, { children: _jsx("img", { className: 'directory-tshirt animation', src: selectPrint }) })) })));
        }
        if (i === 8) {
            tshirtDirectory.push(_jsxs("div", Object.assign({ className: 'menu-item col-md-12 ' }, { children: [_jsx("hr", { className: 'border-top border-bottom border-dark mb-4 directory-hr' }), _jsx("p", Object.assign({ className: "" }, { children: "COMMUNITY PICKS" })), _jsx("hr", { className: 'border-top border-bottom border-dark mb-5 directory-hr ' })] })));
        }
        tshirtDirectory.push(_jsxs("div", Object.assign({ className: 'menu-item col-md-4' }, { children: [_jsx("div", Object.assign({ className: 'col-sm' }, { children: _jsx(Link, Object.assign({ to: '/tshirts/' + tshirt.name.replace(/ /g, '_').toLowerCase() }, { children: _jsx("img", { className: 'directory-tshirt', src: tshirt.img }) })) })), _jsxs("div", Object.assign({ className: 'col-sm menu-tshirt-desc' }, { children: [_jsx("p", Object.assign({ className: "menu-tshirt-desc-name" }, { children: _jsxs(Link, Object.assign({ to: '/tshirts/' + tshirt.name.replace(/ /g, '_').toLowerCase() }, { children: [" ", tshirt.name] })) })), _jsxs("p", Object.assign({ "data-place": "bottom", "data-offset": "{'top': 30}", clickable: "true", "data-effect": "solid", "data-tip": "+10$ for shipping outside EU" }, { children: [tshirt.price, "$ incl. Shipping*"] }))] }))] })));
    });
    return tshirtDirectory;
}
function TshirtsDirectory() {
    let table = createTshirtDirectory();
    return (_jsxs("div", { children: [_jsx(ReactTooltip, {}), _jsx("div", Object.assign({ className: "d-flex justify-content-center align-items-center flex-column " }, { children: _jsx("div", Object.assign({ className: 'menu menu-directory row' }, { children: table })) }))] }));
}
export default TshirtsDirectory;
