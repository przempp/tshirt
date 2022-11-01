import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADD_ITEM_TO_ORDER, GET_ACTIVE_ORDER, GET_FACET_REDBUBBLE, GET_PRODUCT, GET_PRODUCT_FEATURED_ASSET, GET_PRODUCTS_DESIGNS, } from '../../data/queries';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'domp... Remove this comment to see the full error message
import DOMPurify from 'dompurify';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import { Carousel } from 'react-responsive-carousel';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactModal from 'react-modal';
import Spinner from '../../components/spinner/spinner';
function TshirtPage() {
    useEffect(() => {
        if (window.innerWidth < 700)
            window.scrollTo(0, 240);
    }, []);
    const { id } = useParams();
    const [variant, setVariant] = useState(0);
    const [backDesignDialogueOpen, setBackDesignDialogueOpen] = useState(true);
    const [isPickingBackDesign, setIsPickingBackDesign] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [backImage, setBackImage] = useState("");
    const { loading, error, data } = useQuery(GET_PRODUCT, { variables: { slug: id } });
    const { data: dataRedbubble, loading: loadingRedbubble } = useQuery(GET_FACET_REDBUBBLE);
    // const { loading: designsLoading, error: designsError, data: designsData } = useQuery(GET_DESIGNS);
    const [getProductFeaturedAsset, { data: backFeaturedAssetData }] = useLazyQuery(GET_PRODUCT_FEATURED_ASSET);
    const { data: productsDesignsData } = useQuery(GET_PRODUCTS_DESIGNS);
    const [addItemToOrder] = useMutation(ADD_ITEM_TO_ORDER, {
        variables: {
            productVariantId: data && data.product.variants[variant].id,
            quantity: 1,
            backDesign: backImage
        },
        refetchQueries: [{ query: GET_ACTIVE_ORDER }, 'GetActiveOrder']
    });
    // if (data) console.log(data.product.variants[variant].facetValues[0].id)
    // if (productsDesignsData) console.log(productsDesignsData)
    useEffect(() => {
        // Update the document title using the browser API
        if (productsDesignsData && backImage === "" && isPickingBackDesign) {
            setBackImage(productsDesignsData.collection.productVariants.items[0].product.name);
        }
        if (backDesignDialogueOpen)
            setBackImage('');
    }, [productsDesignsData, backImage, isPickingBackDesign, backDesignDialogueOpen]);
    if (loading)
        return _jsx("div", Object.assign({ className: 'd-flex justify-content-center' }, { children: _jsx(Spinner, {}) }));
    if (error)
        return _jsx("div", Object.assign({ className: 'd-flex justify-content-center' }, { children: _jsxs("h2", Object.assign({ className: 'loading-status' }, { children: ["ERROR, try refreshing or contact us through our ", _jsx("a", Object.assign({ href: 'https://t.me/ETDsupportbot' }, { children: "Telegram bot" }))] })) }));
    // if (error) return <p className='loading-status'>Error :(</p>;
    // console.log(activeOrderData)
    let clean = DOMPurify.sanitize(data.product.description, { USE_PROFILES: { html: true } });
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
        return (_jsx("button", Object.assign({ className: "my-button mt-2 w-100 display-6", onClick: onClickFunction }, { children: text })));
    };
    return (_jsxs("div", Object.assign({ className: "row justify-content-center" }, { children: [_jsxs(ReactModal, Object.assign({ style: customStyles, isOpen: isOpen, shouldCloseOnOverlayClick: true, onRequestClose: () => {
                    setBackDesignDialogueOpen(false);
                    setIsPickingBackDesign(false);
                    setIsOpen(false);
                    setIsConfirming(false);
                } }, { children: [backDesignDialogueOpen && _jsx("div", { children: !loadingRedbubble && dataRedbubble.facet.values[0].name === 'true' ?
                            _jsxs(_Fragment, { children: [_jsx("h1", Object.assign({ className: 'text-center' }, { children: "THIS ITEM IS CURRENTLY AVAILABLE ONLY AT OUR REDBUBBLE STORE" })), _jsx("a", Object.assign({ href: data.product.customFields.redbubbleLink, className: "my-button mt-2 w-100 display-6 text-center" }, { children: "BUY ON REDBUBBLE" }))] })
                            :
                                _jsxs(_Fragment, { children: [_jsx("h1", Object.assign({ className: 'text-center' }, { children: "WANT TO ADD A DIFFERENT BACK DESIGN?" })), _jsxs("div", Object.assign({ className: 'd-flex justify-content-around' }, { children: [_jsx("button", Object.assign({ className: 'my-button', onClick: () => {
                                                        setBackDesignDialogueOpen(false);
                                                        setIsPickingBackDesign(true);
                                                    } }, { children: "YES" })), _jsx("button", Object.assign({ className: 'my-button', onClick: () => {
                                                        setBackDesignDialogueOpen(false);
                                                        setIsPickingBackDesign(false);
                                                        setIsOpen(false);
                                                        setBackImage("");
                                                        addItemToOrder();
                                                    } }, { children: "NO" }))] }))] }) }), (isPickingBackDesign) &&
                        _jsxs("div", { children: [_jsx("h1", Object.assign({ className: 'text-center', style: { fontSize: '6vh' } }, { children: "SELECT DESIRED DESIGN ON THE BACK" })), _jsx(Carousel, Object.assign({ showIndicators: false, showArrows: false, showStatus: false, emulateTouch: true, infiniteLoop: true, onChange: (e, item) => {
                                        setBackImage(item.props.id);
                                    } }, { children: (productsDesignsData) && productsDesignsData.collection.productVariants.items.map((items, i) => {
                                        // console.log(items.product)
                                        return (_jsx("div", Object.assign({ id: items.product.name }, { children: _jsx("img", { className: "animation", alt: 'product', src: `${items.product.featuredAsset.preview}?w=200&h=150&mode=crop` }) })));
                                    }) })), _jsx("div", Object.assign({ className: 'text-center' }, { children: _jsx("button", Object.assign({ className: 'my-button', onClick: () => {
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
                                        } }, { children: "SELECT" })) }))] }), isConfirming && _jsxs("div", { children: [_jsx("h2", Object.assign({ className: 'text-center' }, { children: "YOUR SHIRT DESIGN:" })), _jsxs("div", Object.assign({ className: 'd-flex' }, { children: [_jsxs("div", Object.assign({ className: 'd-flex flex-column col-6 text-center' }, { children: [_jsx("h2", { children: "FRONT" }), _jsx("img", { className: "animation", alt: 'product', src: `${data.product.variants[variant].featuredAsset.preview}?preset=small&format=webp` })] })), _jsxs("div", Object.assign({ className: 'd-flex flex-column col-6 text-center' }, { children: [_jsx("h2", { children: "BACK" }), backFeaturedAssetData && _jsx("img", { className: "animation", alt: 'product', src: `${backFeaturedAssetData.search.items[0].productVariantAsset.preview}?preset=small&format=webp` })] }))] })), _jsx("div", Object.assign({ className: 'text-center' }, { children: _jsx("button", Object.assign({ className: 'my-button', onClick: () => {
                                        setIsOpen(false);
                                        setIsConfirming(false);
                                        addItemToOrder();
                                        setBackImage('');
                                    } }, { children: "ADD TO CART" })) }))] })] })), _jsx("div", Object.assign({ className: "col-lg-5 col-md-7 col-xl-6 align-self-center " }, { children: _jsxs(Carousel, Object.assign({ preventMovementUntilSwipeScrollTolerance: true, showIndicators: false, swipeScrollTolerance: 30, showArrows: false, showStatus: false, emulateTouch: true, infiniteLoop: true, onChange: e => setVariant(e) }, { children: [_jsx("div", { children: _jsx("img", { className: "animation tshirt-shadow", alt: 'product', onLoad: () => {
                                    // console.log('image loaded')
                                }, src: `${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp` }) }), _jsx("div", { children: _jsx("img", { className: "animation tshirt-shadow", alt: 'product', src: `${data.product.variants[1].featuredAsset.preview}?preset=large&format=webp` }) })] })) })), _jsxs("div", Object.assign({ className: "col-lg-7 col-md-5 col-xl-6 tshirt-product-info justify-content-center align-self-center " }, { children: [_jsx("div", Object.assign({ className: ' mb-2' }, { children: _jsx("h1", Object.assign({ className: "mb-0" }, { children: data.product.variants[variant].name })) })), _jsxs("div", Object.assign({ className: 'description' }, { children: [_jsx("h2", Object.assign({ className: 'text-justify' }, { children: convertHtmlToReact(clean) })), _jsx("hr", { className: " border-top border-bottom border-dark    " }), (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true') ?
                                _jsxs("h2", { children: ["Due to homoglobo shortages, we are currently handling the shipping and payment processing through ", _jsx("a", Object.assign({ target: "_blank", rel: "noreferrer", href: 'https://www.redbubble.com/people/enjoythedecline/shop' }, { children: "REDBUBBLE" })), ".", _jsx("br", {}), "Hand printing will return shortly."] })
                                :
                                    _jsxs(_Fragment, { children: [_jsxs("h2", Object.assign({ className: 'text-justify' }, { children: ["PRICE: ", data.product.variants[0].price / 100, "$"] })), _jsx("h2", Object.assign({ className: 'text-justify ' }, { children: "EU SHIPPING + 10$, WORLD WIDE SHIPPING +20$" })), " ", _jsx("br", {})] })] }))] })), _jsx("div", Object.assign({ className: 'w-100', style: { paddingLeft: "15px", paddingRight: "15px" } }, { children: ButtonComponent(() => {
                    if (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true')
                        window.open(data.product.customFields.redbubbleLink, '_blank');
                    else {
                        setIsOpen(true);
                        setBackDesignDialogueOpen(true);
                    }
                }, (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true') ? "BUY ON REDBUBBLE" : "ADD" +
                    " TO CART") })), _jsxs("div", Object.assign({ className: 'col-sm-12 description' }, { children: [_jsx("hr", { className: " border-top border-bottom border-dark mb-4" }), _jsx("h3", { children: "Can be supplied as t-shirt or tank top." }), _jsx("h3", { children: "Select sizes S, M, L, or XL, but no bigger since we don't want morbidly obese people to reflect badly on the brand. Go do some pushups lmao." })] }))] })));
}
export default TshirtPage;
