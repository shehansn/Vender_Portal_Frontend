import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDataProduct } from "../redux/productSlide";

import { useSelector } from "react-redux";

import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { DeleteIconSVG, EditIconSVG, StarSVG, StarredSVG } from "../assets/index";

const Favouriteproducts = () => {
  const SERVER_URL = process.env.SERVER_DOMAIN || "http://localhost:8080";

  const dispatch = useDispatch()
  const [isFav, setIsFav] = useState(false);
  const [data, setData] = useState({
    _id: "",
    sku: "",
    productName: "",
    quantity: "",
    productDescription: "",
    image: "",
    isFav: ""
  });


  useEffect(() => {
    (async () => {
      const res = await fetch(`${SERVER_URL}/product`)

      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  }, [])

  const productData = useSelector((state) => state.product.productList);
  
  const favProducts = productData.filter(product => product.isFav === true);

  const handleClick = async (productId, event) => {
    event.preventDefault();
    await addToFav(productId);
  };


  const addToFav = async (productId) => {
    const foundProduct = productData.find(product => product._id === productId);
    if (foundProduct) {
      setData(foundProduct);
      const updatedIsFav = !foundProduct.isFav;
      setIsFav(updatedIsFav);
      console.log(updatedIsFav);

      const fetchData = await fetch(`${SERVER_URL}/addToFav/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isFav: updatedIsFav })
      });

      const fetchRes = await fetchData.json();
      toast(fetchRes.message);
    } else {
      toast("Product not found");
    }
  };

  return (
    <div className="p-10 m-5 ml-10 mr-10 -mt-2 md:p-4">
      <h1 className="text-2xl md:text-4xl font-bold py-3 tracking-widest">
        Products
      </h1>
      <div className="md:flex gap-4 py-2">
        <div className="md:w-2/3">
          <form>
            <div class="relative text-gray-600 mr-20">
              <input
                type="search"
                name="saerch"
                placeholder="Search For Products"
                class="bg-gray-100 w-full h-12 px-5 pr-10 rounded-full text-sm focus:outline-none"
              />

              <button
                type="button"
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
      </div>

      <div className="mt-8">
        <div className="flex w-full items-center">
          <div class="relative overflow-x-auto w-full">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-md text-blue-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Sku
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {favProducts.map((item) => (
                  <tr key={item._id} class="bg-white border-b ">
                    <td class="px-6 py-4  whitespace-nowrap">{item.sku}</td>
                    <td class="px-6 py-4">
                      {" "}
                      <img src={item.image} className="h-10" />
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {item.productName}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {item.quantity}
                    </td>
                    <td class="px-6 py-4 font-medium text-blue-900 flex flex-row">
                      <img
                        className="w-6 h-6 object-cover mr-3"
                        src={DeleteIconSVG}
                        whileHover={{ scale: 1.15 }}
                        alt="delete icon"
                      />
                      <Link to={"/editProduct/" + item._id}>
                        <img
                          className="w-6 h-6 object-cover mr-3"
                          src={EditIconSVG}
                          whileHover={{ scale: 1.15 }}
                          alt="edit icon"
                        />
                      </Link>
                      <div onClick={(event) => handleClick(item._id, event)}>
                        <Link to={""} >
                          {item.isFav ? (
                             <img className="w-6 h-6 object-contain" src={StarredSVG} />
                          ) : (
                            <img
                              className="w-6 h-6 object-cover"
                              src={StarSVG}
                              whileHover={{ scale: 1.15 }}
                              alt="star icon"
                            />
                          )}
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Favouriteproducts