import logo from "../../logo.svg";
import tshirts from "../data/tshirtInformation";
import selectPrint from "../../image/Select Print Front and Back.png"
import {Link} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
    query GetProducts {
        collection(slug: "original") {
            productVariants {
                items {
                    product {
                        id
                        name
                        slug
                        description
                        variants {
                            price
                            name
                        }
                        featuredAsset {
                            preview
                            source
                        }
                    }
                }
            }
        }
        
    }
`

function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.products.items.map(({ id, name }) => (
        <div>
            <h3>{name}</h3>
            {/*<img width="400" height="250" alt="location-reference" src={`${photo}`} />*/}
            {/*<br />*/}
            {/*<b>About this location:</b>*/}
            {/*<p>{description}</p>*/}
            {/*<br />*/}
        </div>
    ));
}


function CreateTshirtDirectoryNew() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let tshirtDirectory;
    let tshirtDirectory2 = [];
    tshirtDirectory = [];
    if (data) console.log(data.collection.productVariants.items)
    tshirtDirectory2.push(
        <div className='menu-item col-md-4'>
            <div className='col-sm'>
                <Link to={'/tshirts/' + data.collection.productVariants.items[0].product.slug}>
                    <img className='directory-tshirt' src={`${data.collection.productVariants.items[0].product.featuredAsset.preview}?preset=medium&format=webp`} />
                </Link>
            </div>
            <div className='col-sm menu-tshirt-desc'>
                <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + data.collection.productVariants.items[0].product.slug}> {data.collection.productVariants.items[0].product.name}</Link></p>
                <p>{(data.collection.productVariants.items[0].product.variants[0].price/100)}$ incl. Shipping</p>
            </div>
        </div>
    )

    data.collection.productVariants.items.map(({product}, i)=>{
        console.log(i)

        tshirtDirectory.push(
            <div className='menu-item col-md-4'>
                <div className='col-sm'>
                    <Link to={'/tshirts/' + product.slug}>
                        <img className='directory-tshirt' src={`${product.featuredAsset.preview}?preset=large&format=webp`} />
                    </Link>
                </div>
                <div className='col-sm menu-tshirt-desc'>
                    <p className="menu-tshirt-desc-name"><Link to={'/tshirts/' + product.slug}> {product.name}</Link></p>
                    <p>{(product.variants[0].price/100)}$ incl. Shipping</p>
                </div>
            </div>
        )
        if (i === 7) {
            tshirtDirectory.push(<div className='directory-sticker menu-item col-md-4 align-self-center' >
                <div className='col-sm '>
                    <img className='directory-tshirt animation' src={selectPrint} />
                </div>
            </div>)
        }
        if (i === 7) {
            tshirtDirectory.push(
                <div  className='menu-item col-md-12 '>
                    <hr className='border-top border-bottom border-dark mb-4 directory-hr'  />
                    <p className="" >COMMUNITY PICKS</p>
                    <hr  className='border-top border-bottom border-dark mb-5 directory-hr '  />
                </div>
            )
        }
    });

        tshirts.forEach((tshirt, i) => {
        if (i === 8) {
            tshirtDirectory2.push(<div className='directory-sticker menu-item col-md-4 align-self-center' >
                <div className='col-sm '>
                    <img className='directory-tshirt animation' src={selectPrint} />
                </div>
            </div>)
        }
        if (i === 8) {
            tshirtDirectory2.push(
                <div  className='menu-item col-md-12 '>
                    <hr className='border-top border-bottom border-dark mb-4 directory-hr'  />
                    <p className="" >COMMUNITY PICKS</p>
                <hr  className='border-top border-bottom border-dark mb-5 directory-hr '  />
                </div>
            )
        }
        tshirtDirectory2.push(
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

function CreateTshirtDirectory() {
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
    let table = CreateTshirtDirectoryNew()
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