import logo from "../../logo.svg";
import tshirts from "../data/tshirtInformation";
import selectPrint from "../../image/Select Print Front and Back.png"
import {Link} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { GET_COLLECTIONS } from '../data/queries'
import CreateTshirtDirectoryNew from './createTshirtDirectory'


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