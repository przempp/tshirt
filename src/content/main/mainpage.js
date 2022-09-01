import logo from "../../logo.svg";
import tshirts from "../data/tshirtInformation";
import selectPrint from "../../image/Select Print Front and Back.png"
import {Link} from "react-router-dom";


function createTshirtDirectory() {
    let tshirtDirectory;
    tshirtDirectory = [];
    tshirts.forEach((tshirt, i) => {
        if (i === 8) {
            tshirtDirectory.push(<div className='directory-sticker menu-item col-md-4 align-self-center' >
                <div className='col-sm '>
                    <img className='directory-tshirt animation' src={selectPrint} />
                </div>
            </div>)
        }
        if (i === 8) {
            tshirtDirectory.push(
                <div  className='menu-item col-md-12 '>
                    <hr className='border-top border-bottom border-dark mb-4 directory-hr'  />
                    <p className="" >COMMUNITY PICKS</p>
                <hr  className='border-top border-bottom border-dark mb-5 directory-hr '  />
                </div>
            )
        }
        tshirtDirectory.push(
            <div className='menu-item col-md-4'>
                <div className='col-sm'>
                    <Link to={'/tshirts/' + tshirt.name.replace(/ /g,'_').toLowerCase()}>
                    <img className='directory-tshirt' src={tshirt.img} />
                    </Link>
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + tshirt.name.replace(/ /g,'_').toLowerCase()}> {tshirt.name}</Link></p>
                    <p>{tshirt.price}$ incl. Shipping</p>
                </div>
            </div>
        )
    })
    return tshirtDirectory
}

function TshirtsDirectory() {
    let table = createTshirtDirectory()
    return (
        <div>
    <div className="d-flex justify-content-center align-items-center flex-column ">
        <div className='menu menu-directory row'>
            {table}
        </div>
    </div>
        </div>
    );
}

export default TshirtsDirectory