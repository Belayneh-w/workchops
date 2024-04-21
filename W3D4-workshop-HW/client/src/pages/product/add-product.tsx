import React, { ChangeEvent, useState, MouseEvent} from "react";
import Product from "../../types/product.type";
import productService from "../../apis/services/product.service";

export default function AddProduct() {

const [product, setProduct] = useState<Product>({id:-1, title:'',price:0, description:''})

const [flag, setFlag] = useState(false)
const {title, price,description}=product
const handleInputChange =(e:ChangeEvent<HTMLInputElement>)=>{
  const {name, value} = e.target
  setProduct({...product, [name]:value})
};

const submit=async (e:MouseEvent<HTMLButtonElement>)=>{
e.preventDefault()
 const response = await productService.saveProd(product)
 if(response.status ===201){
  setProduct({ id: -1, title: "", price: 0, description: "" });
  setFlag(true)
 }
};
  return (
    <div className="mt-5">
      <h2>Add Your Product</h2>
    
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={submit}>
          Submit
        </button>
          <h3>{flag &&<h3 style={{background:"green"}}>Saved Successfully</h3>}</h3>
      </form>
    </div>
  );
}
