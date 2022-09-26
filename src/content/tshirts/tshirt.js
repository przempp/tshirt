import tshirts from "../data/tshirtInformation";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom";
import {
    ADD_ITEM_TO_ORDER,
    GET_ACTIVE_ORDER,
    GET_PRODUCT,
    REMOVE_ITEM_FROM_ORDER,
    ADJUST_ORDER_LINE,
    GET_DESIGNS
} from '../data/queries'
import {useMutation, useQuery} from "@apollo/client";
import DOMPurify from 'dompurify';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import { Carousel } from 'react-responsive-carousel';



function TshirtPage() {
    useEffect(() => {
        if (window.innerWidth < 700) window.scrollTo(0, 240)
    }, [])
    const {id} = useParams();
    const [variant, setVariant] = useState(0)
    const [backImage, setBackImage] = useState("huj")
    const { loading, error, data } = useQuery(GET_PRODUCT, {variables: { slug: id }});
    // const { loading: designsLoading, error: designsError, data: designsData } = useQuery(GET_DESIGNS);
    const { loading: activeOrderLoading, error: activeOrderError, data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    const [addItemToOrder, { loading: addItemLoading, error: addItemError, data: addItemData }] = useMutation(ADD_ITEM_TO_ORDER,
        {
            refetchQueries: [{ query: GET_ACTIVE_ORDER }, 'GetActiveOrder' ],
            variables: { productVariantId: data && data.product.variants[variant].id, quantity: 1, backDesign: backImage  }
        }
    )
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
    if (loading) return <p className='loading-status' >Loading...</p>;
    if (error) return <p className='loading-status'>Error :(</p>;
    console.log(activeOrderData)
    let clean = DOMPurify.sanitize(data.product.description, {USE_PROFILES: {html: true}});
    return(
        <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7  align-self-center ">
                {/*<a  href={data.product.variants[0].featuredAsset.source}>*/}
                {/* <img className="tshirt-product-image"  src={`${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp`}/>*/}
                {/*</a>*/}
                <Carousel showArrows={false} showStatus={false} emulateTouch={true} infiniteLoop={true} onChange={e => setVariant(e)} >
                    <div>
                        <img className="animation" src={`${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp`} />
                    </div>
                    <div>
                        <img className="animation" src={`${data.product.variants[1].featuredAsset.preview}?preset=large&format=webp`} />
                    </div>
                </Carousel>
            </div>

            <div className="col-lg-7 col-md-5 tshirt-product-description justify-content-center align-self-center ">
                <div className='d-flex align-items-center mb-2'>
                <h1 className="mb-0">{data.product.variants[variant].name}</h1>
                    <button className="ml-4 h-100" onClick={addItemToOrder}>
                        Add item
                    </button>
                    <input type="text" value={backImage} onChange={e => setBackImage(e.target.value)}>
                    </input>
                </div>
                <h2 className='text-justify'>{convertHtmlToReact(clean)}</h2>


                <h2 className='text-justify'>{data.product.variants[0].price/100}$ INCLUDES EU SHIPPING, WORLD WIDE SHIPPING +10$</h2>
                <h2 className='text-justify'>15$ FOR EVERY ADDITIONAL SHIRT IN THE SAME SHIPMENT.</h2> <br/>

                <h2 className='text-justify'>See <Link to='/shipping'>Shipping Page</Link> on how to order.</h2>

            </div>

            <div className='col-md-12 '>
                <hr className=" border-top border-bottom border-dark mb-4"/>

                <h3>Can be supplied as t-shirt or tank top.</h3>
                <h3>Select sizes S, M, L, or XL, but no bigger since we don't want morbidly obese people to reflect badly on the brand. Go do some pushups lmao.</h3>

            </div>
        </div>
    )
}

export default TshirtPage