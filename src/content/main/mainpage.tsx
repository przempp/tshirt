import logo from "../../logo.svg";
import tshirts from "../data/tshirtInformation";
import selectPrint from "../../image/Select Print Front and Back.png"
import {Link} from "react-router-dom";
// @ts-expect-error TS(2307): Cannot find module 'react-tooltip' or its correspo... Remove this comment to see the full error message
import ReactTooltip from 'react-tooltip';
import React from "react";

function createTshirtDirectory() {
    let tshirtDirectory: any;
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
                    {/* @ts-expect-error TS(2322): Type '{ children: (string | number)[]; "data-place... Remove this comment to see the full error message */}
                    <p data-place="bottom" data-offset="{'top': 30}" clickable="true" data-effect="solid"  data-tip="+10$ for shipping outside EU">{tshirt.price}$ incl. Shipping*</p>
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
            <ReactTooltip />

             <div className="d-flex justify-content-center align-items-center flex-column ">
                <div className='menu menu-directory row'>
                  {table}
                </div>
             </div>
        </div>
    );
}

export default TshirtsDirectory