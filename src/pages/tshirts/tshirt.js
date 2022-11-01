"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const queries_1 = require("../../data/queries");
const client_1 = require("@apollo/client");
// @ts-expect-error TS(7016): Could not find a declaration file for module 'domp... Remove this comment to see the full error message
const dompurify_1 = __importDefault(require("dompurify"));
const html_to_react_1 = __importDefault(require("@hedgedoc/html-to-react"));
const react_responsive_carousel_1 = require("react-responsive-carousel");
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
const react_modal_1 = __importDefault(require("react-modal"));
const spinner_1 = __importDefault(require("../../components/spinner/spinner"));
function TshirtPage() {
    (0, react_1.useEffect)(() => {
        if (window.innerWidth < 700)
            window.scrollTo(0, 240);
    }, []);
    const { id } = (0, react_router_dom_1.useParams)();
    const [variant, setVariant] = (0, react_1.useState)(0);
    const [backDesignDialogueOpen, setBackDesignDialogueOpen] = (0, react_1.useState)(true);
    const [isPickingBackDesign, setIsPickingBackDesign] = (0, react_1.useState)(false);
    const [isConfirming, setIsConfirming] = (0, react_1.useState)(false);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [backImage, setBackImage] = (0, react_1.useState)("");
    const { loading, error, data } = (0, client_1.useQuery)(queries_1.GET_PRODUCT, { variables: { slug: id } });
    const { data: dataRedbubble, loading: loadingRedbubble } = (0, client_1.useQuery)(queries_1.GET_FACET_REDBUBBLE);
    // const { loading: designsLoading, error: designsError, data: designsData } = useQuery(GET_DESIGNS);
    const [getProductFeaturedAsset, { data: backFeaturedAssetData }] = (0, client_1.useLazyQuery)(queries_1.GET_PRODUCT_FEATURED_ASSET);
    const { data: productsDesignsData } = (0, client_1.useQuery)(queries_1.GET_PRODUCTS_DESIGNS);
    const [addItemToOrder] = (0, client_1.useMutation)(queries_1.ADD_ITEM_TO_ORDER, {
        variables: {
            productVariantId: data && data.product.variants[variant].id,
            quantity: 1,
            backDesign: backImage
        },
        refetchQueries: [{ query: queries_1.GET_ACTIVE_ORDER }, 'GetActiveOrder']
    });
    // if (data) console.log(data.product.variants[variant].facetValues[0].id)
    // if (productsDesignsData) console.log(productsDesignsData)
    (0, react_1.useEffect)(() => {
        // Update the document title using the browser API
        if (productsDesignsData && backImage === "" && isPickingBackDesign) {
            setBackImage(productsDesignsData.collection.productVariants.items[0].product.name);
        }
        if (backDesignDialogueOpen)
            setBackImage('');
    }, [productsDesignsData, backImage, isPickingBackDesign, backDesignDialogueOpen]);
    if (loading)
        return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'd-flex justify-content-center' }, { children: (0, jsx_runtime_1.jsx)(spinner_1.default, {}) }));
    if (error)
        return (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'd-flex justify-content-center' }, { children: (0, jsx_runtime_1.jsxs)("h2", Object.assign({ className: 'loading-status' }, { children: ["ERROR, try refreshing or contact us through our ", (0, jsx_runtime_1.jsx)("a", Object.assign({ href: 'https://t.me/ETDsupportbot' }, { children: "Telegram bot" }))] })) }));
    // if (error) return <p className='loading-status'>Error :(</p>;
    // console.log(activeOrderData)
    let clean = dompurify_1.default.sanitize(data.product.description, { USE_PROFILES: { html: true } });
    const customStyles = {
        content: {
            maxHeight: '95vh',
            maxWidth: '65vh',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(22, 22, 22, 0.85)',
            borderColor: 'grey',
            zIndex: '999999999999'
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.15)'
        },
    };
    // console.log(backImage)
    // console.log(backImageSlug)
    const ButtonComponent = (onClickFunction, text) => {
        return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: "my-button mt-2 w-100 display-6", onClick: onClickFunction }, { children: text })));
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "row justify-content-center" }, { children: [(0, jsx_runtime_1.jsxs)(react_modal_1.default, Object.assign({ style: customStyles, isOpen: isOpen, shouldCloseOnOverlayClick: true, onRequestClose: () => {
                    setBackDesignDialogueOpen(false);
                    setIsPickingBackDesign(false);
                    setIsOpen(false);
                    setIsConfirming(false);
                } }, { children: [backDesignDialogueOpen && (0, jsx_runtime_1.jsx)("div", { children: !loadingRedbubble && dataRedbubble.facet.values[0].name === 'true' ?
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: 'text-center' }, { children: "THIS ITEM IS CURRENTLY AVAILABLE ONLY AT OUR REDBUBBLE STORE" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: data.product.customFields.redbubbleLink, className: "my-button mt-2 w-100 display-6 text-center" }, { children: "BUY ON REDBUBBLE" }))] })
                            :
                                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: 'text-center' }, { children: "WANT TO ADD A DIFFERENT BACK DESIGN?" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'd-flex justify-content-around' }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button', onClick: () => {
                                                        setBackDesignDialogueOpen(false);
                                                        setIsPickingBackDesign(true);
                                                    } }, { children: "YES" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button', onClick: () => {
                                                        setBackDesignDialogueOpen(false);
                                                        setIsPickingBackDesign(false);
                                                        setIsOpen(false);
                                                        setBackImage("");
                                                        addItemToOrder();
                                                    } }, { children: "NO" }))] }))] }) }), (isPickingBackDesign) &&
                        (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: 'text-center', style: { fontSize: '6vh' } }, { children: "SELECT DESIRED DESIGN ON THE BACK" })), (0, jsx_runtime_1.jsx)(react_responsive_carousel_1.Carousel, Object.assign({ showIndicators: false, showArrows: false, showStatus: false, emulateTouch: true, infiniteLoop: true, onChange: (e, item) => {
                                        setBackImage(item.props.id);
                                    } }, { children: (productsDesignsData) && productsDesignsData.collection.productVariants.items.map((items, i) => {
                                        // console.log(items.product)
                                        return ((0, jsx_runtime_1.jsx)("div", Object.assign({ id: items.product.name }, { children: (0, jsx_runtime_1.jsx)("img", { className: "animation", alt: 'product', src: `${items.product.featuredAsset.preview}?w=200&h=150&mode=crop` }) })));
                                    }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'text-center' }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button', onClick: () => {
                                            setBackDesignDialogueOpen(false);
                                            setIsPickingBackDesign(false);
                                            setIsConfirming((true));
                                            // console.log([data.product.variants[variant].facetValues[0].id])
                                            // console.log(backImage)
                                            getProductFeaturedAsset({
                                                variables: {
                                                    term: backImage,
                                                    id: [data.product.variants[variant].facetValues[0].id]
                                                }
                                            });
                                        } }, { children: "SELECT" })) }))] }), isConfirming && (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: 'text-center' }, { children: "YOUR SHIRT DESIGN:" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'd-flex' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'd-flex flex-column col-6 text-center' }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "FRONT" }), (0, jsx_runtime_1.jsx)("img", { className: "animation", alt: 'product', src: `${data.product.variants[variant].featuredAsset.preview}?preset=small&format=webp` })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'd-flex flex-column col-6 text-center' }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "BACK" }), backFeaturedAssetData && (0, jsx_runtime_1.jsx)("img", { className: "animation", alt: 'product', src: `${backFeaturedAssetData.search.items[0].productVariantAsset.preview}?preset=small&format=webp` })] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'text-center' }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button', onClick: () => {
                                        setIsOpen(false);
                                        setIsConfirming(false);
                                        addItemToOrder();
                                        setBackImage('');
                                    } }, { children: "ADD TO CART" })) }))] })] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-lg-5 col-md-7 col-xl-6 align-self-center " }, { children: (0, jsx_runtime_1.jsxs)(react_responsive_carousel_1.Carousel, Object.assign({ preventMovementUntilSwipeScrollTolerance: true, showIndicators: false, swipeScrollTolerance: 30, showArrows: false, showStatus: false, emulateTouch: true, infiniteLoop: true, onChange: e => setVariant(e) }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { className: "animation tshirt-shadow", alt: 'product', onLoad: () => {
                                    // console.log('image loaded')
                                }, src: `${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp` }) }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("img", { className: "animation tshirt-shadow", alt: 'product', src: `${data.product.variants[1].featuredAsset.preview}?preset=large&format=webp` }) })] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-lg-7 col-md-5 col-xl-6 tshirt-product-info justify-content-center align-self-center " }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: ' mb-2' }, { children: (0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "mb-0" }, { children: data.product.variants[variant].name })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'description' }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: 'text-justify' }, { children: (0, html_to_react_1.default)(clean) })), (0, jsx_runtime_1.jsx)("hr", { className: " border-top border-bottom border-dark    " }), (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true') ?
                                (0, jsx_runtime_1.jsxs)("h2", { children: ["Due to homoglobo shortages, we are currently handling the shipping and payment processing through ", (0, jsx_runtime_1.jsx)("a", Object.assign({ target: "_blank", rel: "noreferrer", href: 'https://www.redbubble.com/people/enjoythedecline/shop' }, { children: "REDBUBBLE" })), ".", (0, jsx_runtime_1.jsx)("br", {}), "Hand printing will return shortly."] })
                                :
                                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("h2", Object.assign({ className: 'text-justify' }, { children: ["PRICE: ", data.product.variants[0].price / 100, "$"] })), (0, jsx_runtime_1.jsx)("h2", Object.assign({ className: 'text-justify ' }, { children: "EU SHIPPING + 10$, WORLD WIDE SHIPPING +20$" })), " ", (0, jsx_runtime_1.jsx)("br", {})] })] }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'w-100', style: { paddingLeft: "15px", paddingRight: "15px" } }, { children: ButtonComponent(() => {
                    if (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true')
                        window.open(data.product.customFields.redbubbleLink, '_blank');
                    else {
                        setIsOpen(true);
                        setBackDesignDialogueOpen(true);
                    }
                }, (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true') ? "BUY ON REDBUBBLE" : "ADD" +
                    " TO CART") })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-sm-12 description' }, { children: [(0, jsx_runtime_1.jsx)("hr", { className: " border-top border-bottom border-dark mb-4" }), (0, jsx_runtime_1.jsx)("h3", { children: "Can be supplied as t-shirt or tank top." }), (0, jsx_runtime_1.jsx)("h3", { children: "Select sizes S, M, L, or XL, but no bigger since we don't want morbidly obese people to reflect badly on the brand. Go do some pushups lmao." })] }))] })));
}
exports.default = TshirtPage;
