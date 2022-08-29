import tshirts from "../data/tshirtInformation";
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom";

function TshirtPage() {
    useEffect(() => {
        window.scrollTo(0, 220)
    }, [])
    const {id} = useParams();
    const tshirtIndex = tshirts.findIndex((tshirt) => tshirt.link===id);

    return(
        <div className="row justify-content-center">
            <div className="col-md-5 align-self-center ">
                <a  href={tshirts[tshirtIndex].img}>
                 <img className="tshirt-product-image"  src={tshirts[tshirtIndex].img}/>
                </a>
            </div>

            <div className="col-md-7 tshirt-product-description justify-content-center align-self-center">
                <h1>{tshirts[tshirtIndex].name}</h1>
                <h2>{tshirts[tshirtIndex].desc}</h2>


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