import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { StarredSVG } from "../assets/index";

const NavigationBar = ({ title }) => {

    const [data, setData] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData(value)
        console.log(data)
        setIsButtonDisabled(value.trim() === '');
    }

    const handleSearch = async () => {
        console.log('searching...');

    };

    return (
        <div><h1 className="text-2xl md:text-4xl font-bold py-3 tracking-widest">
            {title}
        </h1>
            <div className="md:flex gap-4 py-2">
                <div className="md:w-2/3">
                    <form onSubmit={handleSearch}>
                        <div class="relative text-gray-600 mr-20">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search For Products"
                                class="bg-gray-100 w-full h-12 px-5 pr-10 rounded-full text-sm focus:outline-none"
                                onChange={handleOnChange}
                            />
                            <Link to={`/searchProduct/${data}`}>
                                <button
                                disabled={isButtonDisabled}
                                    class="text-white  absolute right-1 top-1 w-32 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            class="w-4 h-4 text-gray-100 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    Search
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="md:w-1/3 flex justify-center">
                    <Link to={"/addProduct"} className="font-bold bg-blue-700 text-white px-10 py-1 rounded-md ">
                        <button className="mt-2">
                            New Product
                        </button>
                    </Link>

                    <Link to={"/favProducts"} className="font-bold bg-white text-blue-700 px-5 py-1  ml-5 focus:outline-none  rounded-lg border border-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-700 dark:focus:ring-blue-700">
                        <button className="mt-2" >
                            <img className="w-5 h-5 object-contain" src={StarredSVG} />
                        </button>
                    </Link>
                </div>
            </div></div>
    )
}

export default NavigationBar