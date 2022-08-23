import tshirts from "../data/tshirtInformation";
import { useParams } from 'react-router-dom'

function TshirtPage() {
    const {id} = useParams();
    const tshirtIndex = tshirts.findIndex((tshirt) => tshirt.link===id);

    return(
        <div className="row justify-content-center ">
            <div className="col-md-4 ">
                <img className="tshirt-product-image" src={tshirts[tshirtIndex].img}/>

            </div>

            <div className="col-md-8 tshirt-product-description justify-content-center align-self-center">
                <h2>{tshirts[tshirtIndex].name}</h2>
                <p>{tshirts[tshirtIndex].desc}</p>
            </div>
        </div>
    )
}

export default TshirtPage