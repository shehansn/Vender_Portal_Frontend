import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowSVG } from "../assets/index";
import { ImagetoBase64 } from '../utility/ImagetoBase64';

const Editproduct = () => {
    const SERVER_URL = process.env.SERVER_DOMAIN || "http://localhost:8080";

    const routeParams = useParams();
    const productId = routeParams.productId;
    const productData = useSelector((state) => state.product.productList);

    const [data, setData] = useState({
        _id: "",
        sku: "",
        productName: "",
        quantity: "",
        productDescription: "",
        image: "",
        isFav: false
    })

    useEffect(() => {
        if (routeParams.productId) {
            getProductdata();
            console.log("setIsEditMode(true)");
            console.log("selected product", data);
        } else {
            console.log("setIsEditMode(false)");
        }
    }, []);

    function getProductdata() {
        productData.forEach((product) => {
            console.log(productId, product);
            const foundProduct = productData.find((product) => (product._id == productId));
            console.log("foundProduct ", productId, foundProduct);
            setData(foundProduct);
        });

    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
        console.log(data)

    }

    const uploadImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])

        setData((preve) => {
            return {
                ...preve,
                image: data
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)

        const { sku, productName, quantity, productDescription, image, isFav } = data

        if (sku && productName && quantity && productDescription) {

            const fetchData = await fetch(`${SERVER_URL}/editProduct/${productId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const fetchRes = await fetchData.json()

            console.log(fetchRes)
            toast(fetchRes.message)

            setData(() => {
                return {
                    sku: "",
                    productName: "",
                    quantity: "",
                    productDescription: "",
                    image: "",
                    isFav: false
                }
            })
        }
        else {
            toast("Enter required Fields")
        }
    }
    return (
        <div className="p-4">
            <div className="w-full flex flex-col overflow-x-hidden h-auto flex flex-col items-start px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                <div className=" w-full flex flex-row">
                    <label class="text-3xl uppercase tracking-widest font-bold text-gray-900">
                        Products
                    </label>

                    <label class="w-full flex flex-row text-xl items-center  tracking-tighter font-bold text-blue-700 ">
                        <img src={ArrowSVG} class="w-9 h-9" />
                        Edit Product{" "}
                    </label>
                </div>
                <div class="w-full ">
                    <form class="flex flex-col" onSubmit={handleSubmit}>
                        <div class="flex flex-row items-center">
                            <label class="text-md font-medium text-gray-700 items-center mr-8 ">
                                Sku
                            </label>
                            <div class="relative text-gray-600 w-1/3">
                                <input
                                    type="text"
                                    name="sku"
                                    placeholder="Enter SKU"
                                    class="bg-gray-100 w-96 h-12 px-5 pr-10 rounded-xl text-sm focus:outline-none"
                                    onChange={handleOnChange}
                                    value={data.sku}
                                />
                            </div>
                        </div>

                        <div class="flex flex-row   mt-5 w-full">
                            <div class="flex flex-row items-center w-full">
                                <label class="text-md font-medium text-gray-700 items-center mr-4 ">
                                    Name
                                </label>
                                <div class="relative text-gray-600">
                                    <input
                                        type="text"
                                        name="productName"
                                        placeholder="Enter Product Name"
                                        class="bg-gray-100 w-96 h-12 px-5 pr-10 rounded-xl text-sm focus:outline-none"
                                        onChange={handleOnChange}
                                        value={data.productName}
                                    />
                                </div>
                            </div>
                            <div class="flex flex-row items-center w-full">
                                <label class="text-md font-medium text-gray-700 items-center mr-4 ">
                                    Quantity
                                </label>
                                <div class="relative text-gray-600 ">
                                    <input
                                        type="text"
                                        name="quantity"
                                        placeholder="Enter Quantity"
                                        class="bg-gray-100 w-96 h-12 px-5 pr-10 rounded-xl text-sm focus:outline-none"
                                        onChange={handleOnChange}
                                        value={data.quantity}
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col mt-5">
                            <label class="flex flex-col">
                                <span class="text-md font-medium text-gray-700 items-center  ">
                                    Product Description
                                </span>
                                <span class="text-sm text-gray-400 items-center mt-1 mb-2 ">
                                    A small description about the product
                                </span>
                            </label>
                            <textarea
                                id="description"
                                rows="4"
                                name="productDescription"
                                placeholder="Enter Description"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleOnChange}
                                value={data.productDescription}
                            ></textarea>
                        </div>

                        <div class="flex flex-row mt-5">
                            <label class="flex flex-col mt-1">
                                <span class="text-md font-medium text-gray-700 items-center  ">
                                    Product Images
                                </span>
                                <span class="text-sm text-gray-400 items-center w-1/2 ">
                                    JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                                </span>
                            </label>
                            <div class="relative text-gray-600 w-1/3 flex flex-row">

                                {data.image ? (
                                    <img src={data.image} className="h-16" />
                                ) : (
                                    <><input
                                        type="file"
                                        name="images"
                                        placeholder="Select Images"
                                        class=" w-full h-12 px-5 pr-10 rounded-xl text-sm focus:outline-none "
                                        onChange={uploadImage}
                                    /></>
                                )}
                                <p className="text-blue-700 text-lg ml-2">Edit Images</p>
                            </div>
                        </div>

                        <div className="flex justify-end"> 
                            <button
                            class="text-white mt-5 -mr-8 w-32 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Edit Product
                        </button></div>

                       
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editproduct