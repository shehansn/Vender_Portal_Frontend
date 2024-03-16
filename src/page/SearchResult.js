import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ArrowSVG } from "../assets/index";
import NavigationBar from '../component/NavigationBar';

const SearchResult = () => {
    const SERVER_URL = process.env.SERVER_DOMAIN || "http://localhost:8080";

    const routeParams = useParams();
    const [data, setData] = useState('')
    const [searchedProducts, setSearchedProducts] = useState([])
    useEffect(() => {

        if (routeParams.productName) {
            console.log("selected product", routeParams.productName);
            setData(routeParams.productName);
            searchProducts(routeParams.productName);
        } else {
            console.log("selected product no");
        }
    }, [routeParams.productName]);

    async function searchProducts(name) {
        try {
            const response = await fetch(`${SERVER_URL}/searchProducts/${name}`);

            const resData = await response.json()

            console.log(resData);
            setSearchedProducts(resData);

        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className='p-10 m-5 ml-10 mr-10 -mt-2 md:p-4'>
            <NavigationBar title="Products" />
            {searchedProducts.length<0 ? (
                <>

                    <ul role="list" className="divide-y divide-gray-200 ml-20 mr-20">
                        {searchedProducts.map((item) => (
                            <li className="flex justify-between gap-x-6 py-5 cursor-pointer">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{item.sku}</p>
                                        <p className="mt-1 truncate text-lg leading-5 font-bold text-gray-700">{item.productName}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.productDescription}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end items-center justify-center">
                                    <img src={ArrowSVG} className="w-6 h-6 mt-2 ml-2 " />
                                </div>
                            </li>
                        ))}

                    </ul>
                </>) : (
                <>
                    <h1 className="text-xl md:text-2xl font-bold py-3 tracking-wide ">
                        No Any Matching Products Found        </h1>
                </>
            )}

        </div>
    )
}

export default SearchResult