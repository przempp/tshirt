import { jsx as _jsx } from "react/jsx-runtime";
import ReactLoading from "react-loading";
function Spinner() {
    return (_jsx(ReactLoading, { className: 'loading-status', type: 'spinningBubbles', color: 'grey' }));
}
export default Spinner;
