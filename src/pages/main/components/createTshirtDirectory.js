import {useQuery} from "@apollo/client";
import {GET_COLLECTIONS} from "../../../data/queries";
import selectPrint from "../../../assets/Select Print Front and Back.png";
import {Link} from "react-router-dom";
import Spinner from "../../../components/spinner/spinner";
import React from "react";

function CreateTshirtDirectoryNew() {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);
    if (loading)  return <Spinner/>
    if (error) return <p className='loading-status'>Error :(</p>;
    let tshirtDirectory;
    tshirtDirectory = [];
    data.collections.items.forEach((collections, i)=>{
        collections.productVariants.items.forEach((products, i)=>{
            if (i === 0 && collections.name) {
                tshirtDirectory.push(
                    <div  className='menu-item col-md-12 '>
                        <hr className='border-top border-bottom border-dark mb-4 directory-hr'  />
                        <p className="" >{collections.name}</p>
                        <hr  className='border-top border-bottom border-dark mb-5 directory-hr '  />
                    </div>
                )
            }
            tshirtDirectory.push(SetTable(products))
            if (i === 7 && collections.name === 'Original') {
                tshirtDirectory.push(<div className='directory-sticker menu-item col-md-6 col-lg-4 align-self-center' >
                    <div className='col-sm '>
                        <img alt='product' className='directory-tshirt tshirt-shadow animation'
                             src={selectPrint} />
                    </div>
                </div>)
            }
        })
    })
    return tshirtDirectory

    function SetTable(item) {
        let table = []
        table.push(
            <div className='menu-item  col-md-6 col-lg-4'>
                <div style={{ minHeight: `250px`}} className='col-sm tshirt-div'>
                    <Link to={'/tshirts/' + item.product.slug}>
                        <img alt='product' className={`directory-tshirt tshirt-shadow`} src={`${item.featuredAsset.preview}?preset=large&format=webp`} />
                    </Link>
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + item.product.slug}> {item.product.name}</Link></p>
                    <p>{(item.price/100)}$</p>
                </div>
            </div>
        )
        return table
    }
}

export default CreateTshirtDirectoryNew