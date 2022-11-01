import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@apollo/client";
import { GET_COLLECTIONS } from "../../../data/queries";
import selectPrint from "../../../assets/Select Print Front and Back.png";
import { Link } from "react-router-dom";
import Spinner from "../../../components/spinner/spinner";
function CreateTshirtDirectoryNew() {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);
    if (loading)
        return _jsx(Spinner, {});
    if (error)
        return _jsx("p", Object.assign({ className: 'loading-status' }, { children: "Error :(" }));
    let tshirtDirectory;
    tshirtDirectory = [];
    data.collections.items.forEach((collections, i) => {
        collections.productVariants.items.forEach((products, i) => {
            if (i === 0 && collections.name) {
                tshirtDirectory.push(_jsxs("div", Object.assign({ className: 'menu-item col-md-12 ' }, { children: [_jsx("hr", { className: 'border-top border-bottom border-dark mb-4 directory-hr' }), _jsx("p", Object.assign({ className: "" }, { children: collections.name })), _jsx("hr", { className: 'border-top border-bottom border-dark mb-5 directory-hr ' })] })));
            }
            tshirtDirectory.push(SetTable(products));
            // console.log(collections.name)
            if (i === 7 && collections.name === 'Original') {
                tshirtDirectory.push(_jsx("div", Object.assign({ className: 'directory-sticker menu-item col-md-6 col-lg-4 align-self-center' }, { children: _jsx("div", Object.assign({ className: 'col-sm ' }, { children: _jsx("img", { alt: 'product', className: 'directory-tshirt tshirt-shadow animation', src: selectPrint }) })) })));
            }
        });
    });
    return tshirtDirectory;
    function SetTable(item) {
        let table = [];
        table.push(_jsxs("div", Object.assign({ className: 'menu-item  col-md-6 col-lg-4' }, { children: [_jsx("div", Object.assign({ style: { minHeight: `250px` }, className: 'col-sm tshirt-div' }, { children: _jsx(Link, Object.assign({ to: '/tshirts/' + item.product.slug }, { children: _jsx("img", { alt: 'product', className: `directory-tshirt tshirt-shadow`, src: `${item.featuredAsset.preview}?preset=large&format=webp` }) })) })), _jsxs("div", Object.assign({ className: 'col-sm menu-tshirt-desc' }, { children: [_jsx("p", Object.assign({ className: "menu-tshirt-desc-name" }, { children: _jsxs(Link, Object.assign({ to: '/tshirts/' + item.product.slug }, { children: [" ", item.product.name] })) })), _jsxs("p", { children: [(item.price / 100), "$"] })] }))] })));
        return table;
    }
}
export default CreateTshirtDirectoryNew;
