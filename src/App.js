import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import { setDataProduct } from "./redux/productSlide";

function App() {
  const SERVER_URL=process.env.SERVER_DOMAIN || "http://localhost:8080";

  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${SERVER_URL}/product`)

      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  },[])

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
