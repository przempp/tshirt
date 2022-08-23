import tshirts from "../data/tshirtInformation";
import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom";

function TshirtPage() {
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

                <h2>See <Link to='/shipping'>Shipping Page</Link> on how to order.</h2>

            </div>
        </div>
    )
}

export default TshirtPage