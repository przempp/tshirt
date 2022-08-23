import logo from "../../logo.svg";
import enjoythedd from '../../image/enjoythed.png'
import shipping from '../../image/Shipping.png'
import shirts from '../../image/Shirts.png'
import about from '../../image/About.png'


export function Dupa() {
    return (
        <div className="landingpage">
            <div className="enjoythed">
                <img src={enjoythedd} height={80} width={1080} />
            </div>
            <nav>
                <div className="hatingniggers">
                    <ul className="storeList">
                        <li className="menu-list">
                            <a href="shipping.html" className="">
                                <img
                                    className="shipping menuimg"
                                    src={shipping}
                                    alt="header image"
                                />
                            </a>
                        </li>
                        <li>
                            <a href="shirts.html" className="menuimg ">
                                <img className="shirts menuimg" src={shirts} alt="header image" />
                            </a>
                        </li>
                        <li>
                            <a href="about.html" className="menuimg">
                                <img className="about menuimg" src={about} alt="header image" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Dupa