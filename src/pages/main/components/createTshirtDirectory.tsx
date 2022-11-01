import {useQuery} from "@apollo/client";
import {GET_COLLECTIONS} from "../../../data/queries";
// @ts-expect-error TS(2307): Cannot find module '../../../assets/Select Print F... Remove this comment to see the full error message
import selectPrint from "../../../assets/Select Print Front and Back.png";
import {Link} from "react-router-dom";
// @ts-expect-error TS(6142): Module '../../../components/spinner/spinner' was r... Remove this comment to see the full error message
import Spinner from "../../../components/spinner/spinner";
import React from "react";

function CreateTshirtDirectoryNew() {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (loading)  return <Spinner/>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (error) return <p className='loading-status'>Error :(</p>;
    let tshirtDirectory: any;
    tshirtDirectory = [];
    data.collections.items.forEach((collections: any, i: any)=>{
        collections.productVariants.items.forEach((products: any, i: any)=>{
            if (i === 0 && collections.name) {
                tshirtDirectory.push(
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div  className='menu-item col-md-12 '>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <hr className='border-top border-bottom border-dark mb-4 directory-hr'  />
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <p className="" >{collections.name}</p>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <hr  className='border-top border-bottom border-dark mb-5 directory-hr '  />
                    </div>
                )
            }
            tshirtDirectory.push(SetTable(products))
            // console.log(collections.name)
            if (i === 7 && collections.name === 'Original') {
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                tshirtDirectory.push(<div className='directory-sticker menu-item col-md-6 col-lg-4 align-self-center' >
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className='col-sm '>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <img alt='product' className='directory-tshirt tshirt-shadow animation'
                             src={selectPrint} />
                    </div>
                </div>)
            }
        })
    })
    return tshirtDirectory

    function SetTable(item: any) {
        let table = []
        table.push(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className='menu-item  col-md-6 col-lg-4'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div style={{ minHeight: `250px`}} className='col-sm tshirt-div'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Link to={'/tshirts/' + item.product.slug}>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <img alt='product' className={`directory-tshirt tshirt-shadow`} src={`${item.featuredAsset.preview}?preset=large&format=webp`} />
                    </Link>
                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='col-sm menu-tshirt-desc'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + item.product.slug}> {item.product.name}</Link></p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p>{(item.price/100)}$</p>
                </div>
            </div>
        )
        return table
    }
}



export default CreateTshirtDirectoryNew