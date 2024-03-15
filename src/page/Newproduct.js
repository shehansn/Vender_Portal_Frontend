import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { ArrowSVG } from "../assets/index";

const Newproduct = () => {
  const SERVER_URL = process.env.SERVER_DOMAIN || "http://localhost:8080";

  const [data, setData] = useState({
    sku: "",
    productName: "",
    quantity: "",
    productDescription: "",
    images:[]
  })
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

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


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)

    const { sku, productName, quantity, productDescription } = data

    if (sku && productName && quantity && productDescription) {

      const formData = new FormData();
      console.log('FormData before append:', formData);
      formData.append('sku', sku);
      formData.append('productName', productName);
      formData.append('quantity', quantity);
      formData.append('productDescription', productDescription);
  
      images.forEach(image => {
        formData.append('images', image);
      });
  
      console.log('FormData after append:', formData);
    
      try {
        const response = await fetch(`${SERVER_URL}/upload`, {
          method: "POST",
          body:formData
        });

        console.log(response);
        toast(response.data.message)
      } catch (error) {
        console.error(error);
      }

      setData(() => {
        return {
          sku: "",
          productName: "",
          quantity: "",
          productDescription: "",
        }
      })
      setImages([])
      setImagePreviews([])
    }
    else {
      toast("Enter required Fields")
    }


  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);

    setData(prevData => ({
      ...prevData,
      images: files
    }));
  };

  const handleAddImagesClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className="p-4 ">

      <div className="w-full flex flex-col overflow-x-hidden h-auto flex flex-col items-start px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <div className=" w-full flex flex-row">
          <label class="text-3xl uppercase tracking-widest font-bold text-gray-900">
            Products
          </label>

          <label class="w-full flex flex-row text-xl items-center  tracking-tighter font-bold text-blue-700 ">
            <img src={ArrowSVG} class="w-9 h-9" />
            Add New Product{" "}
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
                <input
                  id="imageUpload"
                  type="file"
                  name="images"
                  placeholder="Select Images"
                  class=" w-full h-12 px-5 pr-10 rounded-xl text-sm focus:outline-none "
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />

                {imagePreviews ? (<div className='flex flex-row'>
                  {imagePreviews.map((preview, index) => (
                    <img key={index} src={preview} alt={`Preview ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px', display: 'flex' }} />
                  ))
                  }</div>) : (<></>)

                }

                <p htmlFor="imageUpload" className="text-blue-700 text-lg ml-2 cursor-pointer" onClick={handleAddImagesClick}>Add Images</p>

              </div>
            </div>

            <button
              class="text-white mt-5 -mr-8 w-32 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Newproduct