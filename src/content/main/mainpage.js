import logo from "../../logo.svg";
import enjoythedd from '../../image/enjoythed.png'
import shipping from '../../image/Shipping.png'
import shirts from '../../image/Shirts.png'
import about from '../../image/About.png'
import crunchy from '../../image/Crunchy.png'
import tshirts from "../data/tshirtInformation";
import selectPrint from "../../image/Select Print Front and Back.png"
import {Link} from "react-router-dom";


function createTshirtDirectory() {
    let tshirtDirectory;
    tshirtDirectory = [];
    tshirts.forEach(tshirt => {
        tshirtDirectory.push(
            <div className='menu-item col-md-4'>
                <div className='col-sm'>
                    <img className='directory-tshirt' src={tshirt.img} />
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + tshirt.name.replace(/ /g,'_').toLowerCase()}> {tshirt.name}</Link></p>
                    <p>{tshirt.price}$ incl Shipping</p>
                </div>
            </div>
        )
    }
    )
    return tshirtDirectory
}

function Dupa() {
    let table = createTshirtDirectory()
    return (
        <div>
    <div className="d-flex justify-content-center align-items-center flex-column">
        <div className='menu menu-directory row'>
            {table}

            <div className='menu-item col-md-4 align-self-center' >
                <div className='col-sm '>
                    <img className='directory-tshirt' src={selectPrint} />

                </div>
            </div>

        </div>
    </div>
        </div>
    );
}

function oldDirectory() {
    return (
        <div>


        <div className='menu menu-directory row'>
            <div className='menu-item col-md'>
                <div className='col-sm'>
                    <img className='directory-tshirt' src={crunchy} />
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p>Dead Washington</p>
                    <p>25 incl Shipping</p>
                </div>
            </div>

            <div className='menu-item col-md'>
                <div className='col-sm'>
                    <img className='directory-tshirt' src={crunchy} />
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p>Dead Washington</p>
                    <p>25 incl Shipping</p>
                </div>
            </div>

            <div className='menu-item col-md'>
                <div className='col-sm'>
                    <img className='directory-tshirt' src={crunchy} />
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p>Dead Washington</p>
                    <p>25 incl Shipping</p>
                </div>
            </div>
        </div>
    {/*new row*/}
    <div className='menu menu-directory row'>
        <div className='menu-item col-md'>
            <div className='col-sm'>
                <img className='directory-tshirt' src={crunchy} />
            </div>
            <div className='col-sm menu-tshirt-desc'>
                <p>Dead Washington</p>
                <p>25 incl Shipping</p>
            </div>
        </div>
        <div className='menu-item col-md'>
            <div className='col-sm'>
                <img className='directory-tshirt' src={crunchy} />
            </div>
            <div className='col-sm menu-tshirt-desc'>
                <p>Dead Washington</p>
                <p>25 incl Shipping</p>
            </div>
        </div>
        <div className='menu-item col-md'>
            <div className='col-sm'>
                <img className='directory-tshirt' src={crunchy} />
            </div>
            <div className='col-sm menu-tshirt-desc'>
                <p>Dead Washington</p>
                <p>25 incl Shipping</p>
            </div>
        </div>
    </div>
    {/*new row*/}
    <div className='menu menu-directory row'>
        <div className='menu-item col-md'>
            <div className='col-sm'>
                <img className='directory-tshirt' src={crunchy} />
            </div>
            <div className='col-sm'>
                <p>Dead Washington</p>
                <p>25 incl Shipping</p>
            </div>
        </div>

        <div className='menu-item col-md'>
            <div className='col-sm'>
                <img className='directory-tshirt' src={crunchy} />
            </div>
            <div className='col-sm'>
                <p>Dead Washington</p>
                <p>25 incl😂 Shipping</p>
            </div>
        </div>

        <div className='menu-item col-md'>
            <div className='col-sm'>
                <img className='directory-tshirt' src={crunchy} />
            </div>
            <div className='col-sm'>
                <p>Dead Washington</p>
                <p>25 incl Shipping</p>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Dupa