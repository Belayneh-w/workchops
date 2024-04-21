import React from "react";
import  { useEffect, useState, MouseEvent } from "react";
import List from "../../components/List/list.compponent";
import Detail from "../../components/List/detail.component";
import Product from "../../types/product.type";
import productService from "../../apis/services/product.service";



export default function ProductList() {
const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  async function getProducts() {
    const response = await productService.getAll();
    setProducts(response.data);
  }
  getProducts();

  // const token = PubSub.subscribe('delete', (msg,data)=>{
  //   const result = setProducts(products.filter(p =>p.id === activeId))
  //   setProducts(result)
  //   setProducts()
  // })
}, []);
const deleteproductById = (id:number)=>{
  setProducts(products.filter(p=>p.id !==id))
}

  return (
    <div className="row mt-5">
      <div className="col">
        {products.length === 0 ? (
          <h2>No Product, Add one</h2>
        ) : (
          <List products={products} />
        )}
      </div>
      <div className="col">
        <Detail onDeleteproductById={deleteproductById} />
      </div>
    </div>
  );
}
