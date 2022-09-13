import tshirts from "../data/tshirtInformation";
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom";
import {GET_COLLECTIONS, GET_PRODUCT} from '../data/queries'
import {useQuery} from "@apollo/client";
import DOMPurify from 'dompurify';
import convertHtmlToReact from '@hedgedoc/html-to-react';

function TshirtPage() {
    useEffect(() => {
        if (window.innerWidth < 700) window.scrollTo(0, 240)
    }, [])
    const {id} = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCT, {variables: { slug: id }});
    if (data) console.log(data.product)
    if (loading) return <p className='loading-status' >Loading...</p>;
    if (error) return <p className='loading-status'>Error :(</p>;
    let clean = DOMPurify.sanitize(data.product.description, {USE_PROFILES: {html: true}});
    return(
        <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7  align-self-center ">
                <a  href={data.product.variants[0].featuredAsset.source}>
                 <img className="tshirt-product-image"  src={`${data.product.variants[0].featuredAsset.preview}?preset=large&format=webp`}/>
                </a>
            </div>

            <div className="col-lg-7 col-md-5 tshirt-product-description justify-content-center align-self-center">
                <h1>{data.product.name}</h1>
                <h2>{convertHtmlToReact(clean)}</h2>

                <h2>{data.product.variants[0].price/100}$ INCLUDES EU SHIPPING, WORLD WIDE SHIPPING +10$</h2>
                <h2>15$ FOR EVERY ADDITIONAL SHIRT IN THE SAME SHIPMENT.</h2> <br/>
                <h2>See <Link to='/shipping'>Shipping Page</Link> on how to order.</h2>

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