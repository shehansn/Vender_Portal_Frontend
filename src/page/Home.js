import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { DeleteIconSVG, EditIconSVG, StarredSVG, StarSVG } from "../assets/index";
import DeletePopup from '../component/DeletePopup';
import NavigationBar from "../component/NavigationBar";
import { setDataFavProduct, setDataProduct } from "../redux/productSlide";

const Home = () => {
  const SERVER_URL = process.env.SERVER_DOMAIN || "http://localhost:8080";
  const [isFav, setIsFav] = useState(false);
  const [data, setData] = useState({
    _id: "",
    sku: "",
    productName: "",
    quantity: "",
    productDescription: "",
    images: [],
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [prodId, setProdId] = useState({});

  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const res = await fetch(`${SERVER_URL}/favProducts`)

      const resData = await res.json()
      dispatch(setDataFavProduct(resData))
    })()

  }, [])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${SERVER_URL}/product`)

      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()

  }, [])


  const productData = useSelector((state) => state.product.productList);
  const favproductData = useSelector((state) => state.product.favProductList);

  console.log("fav products" + JSON.stringify(favproductData))

  const handleClick = async (productId, event) => {
    event.preventDefault();
    await addToFav(productId);
  };

  const addToFav = async (productId) => {
    const fetchData = await fetch(`${SERVER_URL}/addToFav/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prodId: productId })
    });

    const fetchRes = await fetchData.json();
    toast(fetchRes.message);

    const res = await fetch(`${SERVER_URL}/favProducts`)

    const resData = await res.json()
    dispatch(setDataFavProduct(resData))

    saveToLocalStorage(productId);
  };

  const saveToLocalStorage = (productId) => {
    console.log('adding to localstorage...' + productId);
    const existingIds = localStorage.getItem('favProductIds');
    if (existingIds) {
      const ids = JSON.parse(existingIds);
      if (!ids.includes(productId)) {
        ids.push(productId);
        localStorage.setItem('favProductIds', JSON.stringify(ids));
      }else{
        removeIdFromLocalStorage(productId);
      }
    } else {
      localStorage.setItem('favProductIds', JSON.stringify([productId]));
    }
  };

  const removeIdFromLocalStorage = (productId) => {
    console.log('removing from localstorage...' + productId);
    const existingIds = localStorage.getItem('favProductIds');
    if (existingIds) {
      const ids = JSON.parse(existingIds);
      const updatedIds = ids.filter((itemId) => itemId !== productId);
      localStorage.setItem('favProductIds', JSON.stringify(updatedIds));
    }
  };

  const handleDelete = async () => {
    console.log('Deleting...');
    await deleteProduct();

    setIsDeleteModalOpen(false);

    const res = await fetch(`${SERVER_URL}/product`)

    const resData = await res.json()
    dispatch(setDataProduct(resData))
  };

  const deleteProduct = async () => {
    console.log('Deleting...: ' + prodId);
    const fetchData = await fetch(`${SERVER_URL}/deleteProd`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prodId: prodId })
    });

    const fetchRes = await fetchData.json();
    toast(fetchRes.message);

  }

  return (
    <div className="p-10 m-5 ml-10 mr-10 -mt-2 md:p-4">
      <NavigationBar title="Products"/>

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
                {productData.map((item) => (
                  <tr key={item._id} class="bg-white border-b ">
                    <td class="px-6 py-4  whitespace-nowrap">{item.sku}</td>
                    <td class="px-6 py-4">
                      {" "}
                      {/* {`${SERVER_URL}/${item.images[0].substring(7).replace(/\\/g, '/')}`} */}
                      {item.images.length > 0 && <img src={`${SERVER_URL}/${item.images[0].substring(7).replace(/\\/g, '/')}`} alt={"Product image"} className="h-16" />}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {item.productName}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {item.quantity}
                    </td>
                    <td class="px-6 py-4 font-medium text-blue-900 flex flex-row">
                      <img
                        className="w-6 h-6 object-cover mr-3 cursor-pointer"
                        src={DeleteIconSVG}
                        whileHover={{ scale: 1.15 }}
                        alt="delete icon"
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setProdId(item._id)
                        }}
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
                        <Link to={"/"} >
                          {favproductData.some(favItem => favItem.id === item._id) ? (
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

      <DeletePopup
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

    </div>
  );
};

export default Home;
