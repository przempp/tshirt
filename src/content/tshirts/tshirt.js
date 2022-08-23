import tshirts from "../data/tshirtInformation";
import { useParams } from 'react-router-dom'

function TshirtPage() {
    const {id} = useParams();
    const tshirtIndex = tshirts.findIndex((tshirt) => tshirt.link===id);

    return(
        <div className="row justify-content-center shipping">
            <div className="col-md-5 align-self-center ">
                <img className="tshirt-product-image " src={tshirts[tshirtIndex].img}/>

            </div>

            <div className="col-md-7 tshirt-product-description justify-content-center align-self-center">
                <h1>{tshirts[tshirtIndex].name}</h1>
                <h2>{tshirts[tshirtIndex].desc}</h2>
            </div>
        </div>
    )
}

export default TshirtPage