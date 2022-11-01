import { jsx as _jsx } from "react/jsx-runtime";
import CreateTshirtDirectoryNew from './components/createTshirtDirectory';
function Main() {
    let table = CreateTshirtDirectoryNew();
    return (_jsx("div", { children: _jsx("div", Object.assign({ className: "d-flex justify-content-center align-items-center flex-column " }, { children: _jsx("div", Object.assign({ className: 'menu menu-directory row justify-content-center' }, { children: table })) })) }));
}
export default Main;
