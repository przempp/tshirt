// @ts-expect-error TS(2307): Cannot find module '../../logo.svg' or its corresp... Remove this comment to see the full error message
import logo from "../../logo.svg";
import tshirts from "../data/tshirtInformation";
// @ts-expect-error TS(2307): Cannot find module '../../image/Select Print Front... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            tshirtDirectory.push(<div className='directory-sticker menu-item col-md-4 align-self-center' >
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='col-sm '>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <img className='directory-tshirt animation' src={selectPrint} />
                </div>
            </div>)
        }
        if (i === 8) {
            tshirtDirectory.push(
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div  className='menu-item col-md-12 '>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <hr className='border-top border-bottom border-dark mb-4 directory-hr'  />
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className="" >COMMUNITY PICKS</p>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <hr  className='border-top border-bottom border-dark mb-5 directory-hr '  />
                </div>
            )
        }
        tshirtDirectory.push(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className='menu-item col-md-4'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='col-sm'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Link to={'/tshirts/' + tshirt.name.replace(/ /g,'_').toLowerCase()}>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <img className='directory-tshirt' src={tshirt.img} />
                    </Link>
                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='col-sm menu-tshirt-desc'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + tshirt.name.replace(/ /g,'_').toLowerCase()}> {tshirt.name}</Link></p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ReactTooltip />

             {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
             <div className="d-flex justify-content-center align-items-center flex-column ">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='menu menu-directory row'>
                  {table}
                </div>
             </div>
        </div>
    );
}

export default TshirtsDirectory