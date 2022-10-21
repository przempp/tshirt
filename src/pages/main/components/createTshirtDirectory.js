import {useQuery} from "@apollo/client";
import {GET_COLLECTIONS} from "../../../data/queries";
import selectPrint from "../../../assets/Select Print Front and Back.png";
import {Link} from "react-router-dom";

function CreateTshirtDirectoryNew() {
    const { loading, error, data } = useQuery(GET_COLLECTIONS);
    if (loading) return <p className='loading-status' >Loading...</p>;
    if (error) return <p className='loading-status'>Error :(</p>;
    let tshirtDirectory;
    tshirtDirectory = [];
    data.collections.items.map((collections, i)=>{
        collections.productVariants.items.map((products, i)=>{
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
            console.log(collections.name)
            if (i === 7 && collections.name === 'Original') {
                tshirtDirectory.push(<div className='directory-sticker menu-item col-md-6 col-lg-4 align-self-center' >
                    <div className='col-sm '>
                        <img className='directory-tshirt tshirt-shadow animation' src={selectPrint} />
                    </div>
                </div>)
            }
        })
    })
    return tshirtDirectory

    function SetTable(item) {
        let tshirtDirectory = []
        tshirtDirectory.push(
            <div className='menu-item  col-md-6 col-lg-4'>
                <div className='col-sm'>
                    <Link to={'/tshirts/' + item.product.slug}>
                        <img className='directory-tshirt tshirt-shadow' src={`${item.featuredAsset.preview}?preset=large&format=webp`} />
                    </Link>
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + item.product.slug}> {item.product.name}</Link></p>
                    <p>{(item.price/100)}$</p>
                </div>
            </div>
        )
        return tshirtDirectory
    }
}



export default CreateTshirtDirectoryNew