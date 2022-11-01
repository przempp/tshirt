import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {
    ADD_ITEM_TO_ORDER,
    GET_ACTIVE_ORDER,
    GET_FACET_REDBUBBLE,
    GET_PRODUCT,
    GET_PRODUCT_FEATURED_ASSET,
    GET_PRODUCTS_DESIGNS,
} from '../../data/queries'
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'domp... Remove this comment to see the full error message
import DOMPurify from 'dompurify';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import {Carousel} from 'react-responsive-carousel';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ReactModal from 'react-modal';
// @ts-expect-error TS(6142): Module '../../components/spinner/spinner' was reso... Remove this comment to see the full error message
import Spinner from '../../components/spinner/spinner'


function TshirtPage() {
    useEffect(() => {
        if (window.innerWidth < 700) window.scrollTo(0, 240)
    }, [])
    const {id} = useParams();
    const [variant, setVariant] = useState(0)
    const [backDesignDialogueOpen, setBackDesignDialogueOpen] = useState(true)
    const [isPickingBackDesign, setIsPickingBackDesign] = useState(false)
    const [isConfirming, setIsConfirming] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [backImage, setBackImage] = useState("")
    const {loading, error, data} = useQuery(GET_PRODUCT, {variables: {slug: id}});
    const {data: dataRedbubble, loading: loadingRedbubble} = useQuery(GET_FACET_REDBUBBLE);
    // const { loading: designsLoading, error: designsError, data: designsData } = useQuery(GET_DESIGNS);
    const [getProductFeaturedAsset, {
        data: backFeaturedAssetData
    }] = useLazyQuery(GET_PRODUCT_FEATURED_ASSET);
    const {
        data: productsDesignsData
    } = useQuery(GET_PRODUCTS_DESIGNS);
    const [addItemToOrder] = useMutation(ADD_ITEM_TO_ORDER,
        {
            variables: {
                productVariantId: data && data.product.variants[variant].id,
                quantity: 1,
                backDesign: backImage
            },
            refetchQueries: [{query: GET_ACTIVE_ORDER}, 'GetActiveOrder']
        }
    )
    // if (data) console.log(data.product.variants[variant].facetValues[0].id)
    // if (productsDesignsData) console.log(productsDesignsData)


    useEffect(() => {
        // Update the document title using the browser API
        if (productsDesignsData && backImage === "" && isPickingBackDesign) {
            setBackImage(productsDesignsData.collection.productVariants.items[0].product.name)
        }
        if (backDesignDialogueOpen) setBackImage('')

    }, [productsDesignsData, backImage, isPickingBackDesign, backDesignDialogueOpen]);

    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (loading) return <div className='d-flex justify-content-center'>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Spinner/>
    </div>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (error) return <div className='d-flex justify-content-center'>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <h2 className='loading-status' >ERROR, try refreshing or contact us through
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            our <a href='https://t.me/ETDsupportbot'>Telegram bot</a></h2>
    </div>
    // if (error) return <p className='loading-status'>Error :(</p>;
    // console.log(activeOrderData)
    let clean = DOMPurify.sanitize(data.product.description, {USE_PROFILES: {html: true}});

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

    const ButtonComponent = (onClickFunction: any, text: any) => {
        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className="my-button mt-2 w-100 display-6"
                    onClick={onClickFunction}>
                {text}
            </button>
        )
    }


    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="row justify-content-center">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ReactModal style={customStyles} isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={() => {
                setBackDesignDialogueOpen(false)
                setIsPickingBackDesign(false)
                setIsOpen(false)
                setIsConfirming(false)
            }}>

                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {backDesignDialogueOpen && <div>
                    {!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true' ?
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <h1 className='text-center'>THIS ITEM IS CURRENTLY AVAILABLE ONLY AT OUR REDBUBBLE
                                STORE</h1>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <a href={data.product.customFields.redbubbleLink}
                               className="my-button mt-2 w-100 display-6 text-center">BUY ON REDBUBBLE</a>
                        </>
                        :
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <h1 className='text-center'>WANT TO ADD A DIFFERENT BACK DESIGN?</h1>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className='d-flex justify-content-around'>
                                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <button className='my-button' onClick={() => {
                                    setBackDesignDialogueOpen(false);
                                    setIsPickingBackDesign(true);
                                }}>YES
                                </button>
                                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <button className='my-button' onClick={() => {
                                    setBackDesignDialogueOpen(false);
                                    setIsPickingBackDesign(false);
                                    setIsOpen(false);
                                    setBackImage("")
                                    addItemToOrder()
                                }}>NO
                                </button>

                            </div>
                        </>}
                </div>}

                {(isPickingBackDesign) &&
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <h1 className='text-center' style={{fontSize: '6vh'}}>SELECT DESIRED DESIGN ON THE BACK</h1>

                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Carousel showIndicators={false} showArrows={false} showStatus={false} emulateTouch={true}
                              infiniteLoop={true} onChange={(e, item,) => {
                        setBackImage((item as any).props.id);
                    }}>

                        {
                            (productsDesignsData) && productsDesignsData.collection.productVariants.items.map((items: any, i: any) => {
                                // console.log(items.product)
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                return (<div id={items.product.name}>
                                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <img className="animation" alt='product'
                                         src={`${items.product.featuredAsset.preview}?w=200&h=150&mode=crop`}/>
                                </div>)
                            })
                        }
                    </Carousel>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className='text-center'>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button className='my-button' onClick={() => {
                            setBackDesignDialogueOpen(false);
                            setIsPickingBackDesign(false)
                            setIsConfirming((true))
                            // console.log([data.product.variants[variant].facetValues[0].id])
                            // console.log(backImage)
                            getProductFeaturedAsset({
                                variables: {
                                    term: backImage,
                                    id: [data.product.variants[variant].facetValues[0].id]
                                }
                            })
                            ;
                        }}>SELECT
                        </button>
                    </div>
                </div>}
                {/*{console.log(dataRedbubble)}*/}
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {isConfirming && <div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <h2 className='text-center'>YOUR SHIRT DESIGN:</h2>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className='d-flex'>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className='d-flex flex-column col-6 text-center'>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <h2>FRONT</h2>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <img className="animation" alt='product'
                                 src={`${data.product.variants[variant].featuredAsset.preview}?preset=small&format=webp`}/>
                        </div>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className='d-flex flex-column col-6 text-center'>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <h2>BACK</h2>
                            {/*{backFeaturedAssetData && console.log(backFeaturedAssetData.search)}*/}
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            {backFeaturedAssetData && <img className="animation" alt='product'
                                                           src={`${backFeaturedAssetData.search.items[0].productVariantAsset.preview}?preset=small&format=webp`}/>}
                        </div>
                    </div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className='text-center'>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button className='my-button'
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsConfirming(false)
                                    addItemToOrder()
                                    setBackImage('')
                                }}
                        >ADD TO CART
                        </button>

                    </div>

                </div>}


            </ReactModal>

            {/* modal end */}

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="col-lg-5 col-md-7 col-xl-6 align-self-center ">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Carousel preventMovementUntilSwipeScrollTolerance={true} showIndicators={false}
                          swipeScrollTolerance={30} showArrows={false} showStatus={false} emulateTouch={true}
                          infiniteLoop={true} onChange={e => setVariant(e)}>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div>

                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <img className="animation tshirt-shadow" alt='product'
                                 onLoad={() => {
                                     // console.log('image loaded')
                                 }}
                                 src={`${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp`}/>


                    </div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <img className="animation tshirt-shadow" alt='product'
                             src={`${data.product.variants[1].featuredAsset.preview}?preset=large&format=webp`}/>
                    </div>
                </Carousel>
            </div>

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="col-lg-7 col-md-5 col-xl-6 tshirt-product-info justify-content-center align-self-center ">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className=' mb-2'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <h1 className="mb-0">{data.product.variants[variant].name}</h1>


                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='description'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <h2 className='text-justify'>{convertHtmlToReact(clean)}</h2>

                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <hr className=" border-top border-bottom border-dark    "/>
                    {(!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true') ?
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <h2>
                            Due to homoglobo shortages, we are currently handling the shipping and payment processing
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            through <a target="_blank" rel="noreferrer" href='https://www.redbubble.com/people/enjoythedecline/shop'>REDBUBBLE</a>.
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <br/>Hand printing will return shortly.
                        </h2>
                        :
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <h2 className='text-justify'>PRICE: {data.product.variants[0].price / 100}$</h2>
                            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <h2 className='text-justify '>EU SHIPPING + 10$, WORLD
                                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                WIDE SHIPPING +20$</h2> <br/>
                        </>
                    }

                </div>
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='w-100' style={{paddingLeft: "15px", paddingRight: "15px"}}>
                {/*{console.log(dataRedbubble.facet.values[0].name)}*/}

                {ButtonComponent(() => {
                        if (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true')
                            window.open(data.product.customFields.redbubbleLink, '_blank')
                        else {
                            setIsOpen(true)
                            setBackDesignDialogueOpen(true)
                        }

                    },
                    (!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true') ? "BUY ON REDBUBBLE" : "ADD" +
                    " TO CART"
                )}

            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='col-sm-12 description'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <hr className=" border-top border-bottom border-dark mb-4"/>

                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h3>Can be supplied as t-shirt or tank top.</h3>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h3>Select sizes S, M, L, or XL, but no bigger since we don't want morbidly obese people to reflect
                    badly on the brand. Go do some pushups lmao.</h3>

            </div>
        </div>
    );
}

export default TshirtPage