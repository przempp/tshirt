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
import DOMPurify from 'dompurify';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import {Carousel} from 'react-responsive-carousel';
import ReactModal from 'react-modal';
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

    useEffect(() => {
        // Update the document title using the browser API
        if (productsDesignsData && backImage === "" && isPickingBackDesign) {
            setBackImage(productsDesignsData.collection.productVariants.items[0].product.name)
        }
        if (backDesignDialogueOpen) setBackImage('')

    }, [productsDesignsData, backImage, isPickingBackDesign, backDesignDialogueOpen]);

    if (loading) return <div className='d-flex justify-content-center'>
        <Spinner/>
    </div>
    if (error) return <div className='d-flex justify-content-center'>
        <h2 className='loading-status' >ERROR, try refreshing or contact us through
            our <a href='https://t.me/ETDsupportbot'>Telegram bot</a></h2>
    </div>
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

    const ButtonComponent = (onClickFunction, text) => {
        return (
            <button className="my-button mt-2 w-100 display-6"
                    onClick={onClickFunction}>
                {text}
            </button>
        )
    }

    return (
        <div className="row justify-content-center">
            <ReactModal style={customStyles} isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={() => {
                setBackDesignDialogueOpen(false)
                setIsPickingBackDesign(false)
                setIsOpen(false)
                setIsConfirming(false)
            }}>
                {backDesignDialogueOpen && <div>
                    {!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true' ?
                        <>
                            <h1 className='text-center'>THIS ITEM IS CURRENTLY AVAILABLE ONLY AT OUR REDBUBBLE
                                STORE</h1>
                            <a href={data.product.customFields.redbubbleLink}
                               className="my-button mt-2 w-100 display-6 text-center">BUY ON REDBUBBLE</a>
                        </>
                        :
                        <>
                            <h1 className='text-center'>WANT TO ADD A DIFFERENT BACK DESIGN?</h1>
                            <div className='d-flex justify-content-around'>
                                <button className='my-button' onClick={() => {
                                    setBackDesignDialogueOpen(false);
                                    setIsPickingBackDesign(true);
                                }}>YES
                                </button>
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
                <div>
                    <h1 className='text-center' style={{fontSize: '6vh'}}>SELECT DESIRED DESIGN ON THE BACK</h1>

                    <Carousel showIndicators={false} showArrows={false} showStatus={false} emulateTouch={true}
                              infiniteLoop={true} onChange={(e, item,) => {
                        setBackImage(item.props.id)
                    }}>

                        {
                            (productsDesignsData) && productsDesignsData.collection.productVariants.items.map((items, i) => {
                                return (<div id={items.product.name}>
                                    <img className="animation" alt='product'
                                         src={`${items.product.featuredAsset.preview}?w=200&h=150&mode=crop`}/>
                                </div>)
                            })
                        }
                    </Carousel>
                    <div className='text-center'>
                        <button className='my-button' onClick={() => {
                            setBackDesignDialogueOpen(false);
                            setIsPickingBackDesign(false)
                            setIsConfirming((true))
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
                {isConfirming && <div>
                    <h2 className='text-center'>YOUR SHIRT DESIGN:</h2>
                    <div className='d-flex'>
                        <div className='d-flex flex-column col-6 text-center'>
                            <h2>FRONT</h2>
                            <img className="animation" alt='product'
                                 src={`${data.product.variants[variant].featuredAsset.preview}?preset=small&format=webp`}/>
                        </div>
                        <div className='d-flex flex-column col-6 text-center'>
                            <h2>BACK</h2>
                            {backFeaturedAssetData && <img className="animation" alt='product'
                                                           src={`${backFeaturedAssetData.search.items[0].productVariantAsset.preview}?preset=small&format=webp`}/>}
                        </div>
                    </div>
                    <div className='text-center'>
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
            <div className="col-lg-5 col-md-7 col-xl-6 align-self-center ">
                    <Carousel preventMovementUntilSwipeScrollTolerance={true} showIndicators={false}
                          swipeScrollTolerance={30} showArrows={false} showStatus={false} emulateTouch={true}
                          infiniteLoop={true} onChange={e => setVariant(e)}>
                    <div>
                            <img className="animation tshirt-shadow" alt='product'
                                 onLoad={() => {
                                 }}
                                 src={`${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp`}/>
                    </div>
                    <div>
                        <img className="animation tshirt-shadow" alt='product'
                             src={`${data.product.variants[1].featuredAsset.preview}?preset=large&format=webp`}/>
                    </div>
                </Carousel>
            </div>
            <div className="col-lg-7 col-md-5 col-xl-6 tshirt-product-info justify-content-center align-self-center ">
                <div className=' mb-2'>
                    <h1 className="mb-0">{data.product.variants[variant].name}</h1>
                </div>
                <div className='description'>
                    <h2 className='text-justify'>{convertHtmlToReact(clean)}</h2>
                    <hr className=" border-top border-bottom border-dark    "/>
                    {(!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true') ?
                        <h2>
                            Due to homoglobo shortages, we are currently handling the shipping and payment processing
                            through <a target="_blank" rel="noreferrer" href='https://www.redbubble.com/people/enjoythedecline/shop'>REDBUBBLE</a>.
                            <br/>Hand printing will return shortly.
                        </h2>
                        :
                        <>
                            <h2 className='text-justify'>PRICE: {data.product.variants[0].price / 100}$</h2>
                            <h2 className='text-justify '>EU SHIPPING + 10$, WORLD
                                WIDE SHIPPING +20$</h2> <br/>
                        </>
                    }
                </div>
            </div>
            <div className='w-100' style={{paddingLeft: "15px", paddingRight: "15px"}}>
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
            <div className='col-sm-12 description'>
                <hr className=" border-top border-bottom border-dark mb-4"/>

                <h3>Can be supplied as t-shirt or tank top.</h3>
                <h3>Select sizes S, M, L, or XL, but no bigger since we don't want morbidly obese people to reflect
                    badly on the brand. Go do some pushups lmao.</h3>

            </div>
        </div>
    )
}

export default TshirtPage