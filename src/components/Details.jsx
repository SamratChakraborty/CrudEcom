import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
//import axios from "../utils/axios";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams();

  // const getsingleproduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setproduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (!product) {
      setproduct(products.filter((p) => p.id == id)[0]);
    }
    //getsingleproduct();
  }, []);

  const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));
    navigate("/");
  };

  return product ? (
    <div className="w-[70%] flex h-full justify-between  items-center m-auto p-[10%]">
      <img
        className="object-contain h-[80%] w-[40%]"
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[60%] ml-10">
        <h1 className="text-4xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5">{product.category}</h3>
        <h2 className="text-red-300 mb-3">$ {product.price}</h2>
        <p className="mb-5">{product.description}</p>
        <Link
          to={`/edit/${product.id}`}
          className="mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300"
        >
          Edit
        </Link>
        <button
          onClick={() => ProductDeleteHandler(product.id)}
          className="py-2 px-5 border rounded border-red-200 text-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Details;
