import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
function Shipping() {
    useEffect(() => {
        if (window.innerWidth < 700)
            window.scrollTo(0, 130);
    }, []);
    return (_jsx("div", Object.assign({ className: 'shipping', style: { textAlign: 'center' } }, { children: _jsxs("h2", { children: [_jsxs("p", { children: ["Currently ", _jsx("a", Object.assign({ href: 'https://www.redbubble.com/' }, { children: "redbubble" })), " is handling all the shipping and payment processing"] }), _jsxs("p", { children: ["For questions contact us through our ", _jsx("a", Object.assign({ href: 'https://t.me/ETDsupportbot' }, { children: "Telegram bot" }))] })] }) })));
}
export default Shipping;
