import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import {
    ADD_ITEM_TO_ORDER,
    GET_ACTIVE_ORDER,
    GET_PRODUCT,
    GET_PRODUCT_FEATURED_ASSET,
    GET_PRODUCTS_DESIGNS,
    GET_FACET_REDBUBBLE,
} from '../../data/queries'
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import DOMPurify from 'dompurify';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import {Carousel} from 'react-responsive-carousel';
import ReactModal from 'react-modal';


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
    const {loading: activeOrderLoading, error: activeOrderError, data: activeOrderData} = useQuery(GET_ACTIVE_ORDER);
    const [getProductFeaturedAsset, {
        loading: backFeaturedAssetLoading,
        error: backFeaturedAssetError,
        data: backFeaturedAssetData
    }] = useLazyQuery(GET_PRODUCT_FEATURED_ASSET);
    const {
        loading: productsDesignsLoading,
        error: productsDesignsError,
        data: productsDesignsData
    } = useQuery(GET_PRODUCTS_DESIGNS);
    const [addItemToOrder, {
        loading: addItemLoading,
        error: addItemError,
        data: addItemData
    }] = useMutation(ADD_ITEM_TO_ORDER,
        {
            variables: {
                productVariantId: data && data.product.variants[variant].id,
                quantity: 1,
                backDesign: backImage
            },
            refetchQueries: [{query: GET_ACTIVE_ORDER}, 'GetActiveOrder']
        }
    )
    if (data) console.log(data.product.variants[variant].facetValues[0].id)
    if (productsDesignsData) console.log(productsDesignsData)
    // if (productsDesignsData) productsDesignsData.collection.productVariants.items.map((items, i) => {
    //     // console.log(`${items.product.featuredAsset.preview}?preset=thumb`)
    // })

    useEffect(() => {
        // Update the document title using the browser API
        if (productsDesignsData && backImage === "" && isPickingBackDesign) {
            setBackImage(productsDesignsData.collection.productVariants.items[0].product.name)
        }
        if (backDesignDialogueOpen) setBackImage('')

    });

    // const [adjustOrderLine, { loading: adjustLoading, error: adjustError, data: adjustItemData }] = useMutation(ADJUST_ORDER_LINE, {variables: { orderLineId:
    //             (activeOrderData && activeOrderData.activeOrder.lines[0]) && activeOrderData.activeOrder.lines[0].id, quantity: 1  }})
    // const [removeItemFromOrder, { loading: removeItemLoading, error: removeItemError, data: removeItemData }] =
    //     useMutation(REMOVE_ITEM_FROM_ORDER, {variables: { orderLineId:
    //                 (activeOrderData && activeOrderData.activeOrder.lines[0]) && activeOrderData.activeOrder.lines[0].id }})

    // if (designsData) console.log(designsData.collection.productVariants.items)

    // if (data) console.log(data.product.variants[0].id)
    // if (activeOrderData) console.log(activeOrderData.activeOrder.lines)
    // if (activeOrderData) console.log(activeOrderData)
    // if (addItemData) console.log(addItemData)
    if (loading) return <p className='loading-status'>Loading...</p>;
    if (error) return <p className='loading-status'>Error :(</p>;
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
                            <h1 className='text-center'>THIS ITEM IS CURRENTLY AVAILABLE ONLY AT OUR REDBUBBLE STORE</h1>
                            <a href={data.product.customFields.redbubbleLink} className="my-button mt-2 w-100 display-6 text-center">BUY ON REDBUBBLE</a>
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
                                // console.log(items.product)
                                return (<div id={items.product.name}>
                                    <img className="animation "
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
                            console.log([data.product.variants[variant].facetValues[0].id])
                            console.log(backImage)
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
                {console.log(dataRedbubble)}
                {isConfirming && <div>
                    <h2 className='text-center'>YOUR SHIRT DESIGN:</h2>
                    <div className='d-flex'>
                        <div className='d-flex flex-column col-6 text-center'>
                            <h2>FRONT</h2>
                            <img className="animation"
                                 src={`${data.product.variants[variant].featuredAsset.preview}?preset=small&format=webp`}/>
                        </div>
                        <div className='d-flex flex-column col-6 text-center'>
                            <h2>BACK</h2>
                            {backFeaturedAssetData && console.log(backFeaturedAssetData.search)}
                            {backFeaturedAssetData && <img className="animation"
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

            <div className="col-lg-5 col-md-7 col-xl-6  align-self-center ">
                {/*<a  href={data.product.variants[0].featuredAsset.source}>*/}
                {/* <img className="tshirt-product-assets"  src={`${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp`}/>*/}
                {/*</a>*/}
                <Carousel preventMovementUntilSwipeScrollTolerance={true} showIndicators={false}
                          swipeScrollTolerance={30} showArrows={false} showStatus={false} emulateTouch={true}
                          infiniteLoop={true} onChange={e => setVariant(e)}>
                    <div>
                        <img className="animation tshirt-shadow"
                             src={`${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp`}/>
                    </div>
                    <div>
                        <img className="animation tshirt-shadow"
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
                    <h2 className='text-justify'>PRICE: {data.product.variants[0].price / 100}$</h2>
                    <h2 className='text-justify '>EU SHIPPING + 10$, WORLD
                        WIDE SHIPPING +20$</h2> <br/>

                    {data.product.customFields.redbubbleLink ?
                    <h2 className='text-justify'>Also available at <a target="_blank" href={data.product.customFields.redbubbleLink} >REDBUBBLE</a></h2>
                    :
                        <h2 className='text-justify'>Check our other designs at <a target="_blank" href='https://www.redbubble.com/people/enjoythedecline/shop' >REDBUBBLE</a></h2>
                    }
                </div>
            </div>
            <div className='w-100' style={{ paddingLeft: "15px", paddingRight: "15px"}}>
                {/*{console.log(dataRedbubble.facet.values[0].name)}*/}
                    <button className="my-button mt-2 w-100 display-6" onClick={() => {
                        setIsOpen(true);
                        setBackDesignDialogueOpen(true)
                    }}>
                        {!loadingRedbubble && dataRedbubble.facet.values[0].name === 'true' ? 'CHECK ON REDBUBBLE' : 'ADD TO' +
                            ' CART'}
                    </button>

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