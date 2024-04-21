import React, { useEffect, useState } from 'react'
import Product from '../../types/product.type';
import productService from '../../apis/services/product.service';


type Props = {
  onDeleteproductById:(id:number)=>void;
};

export default function Detail(props:Props) {
  const {onDeleteproductById} = props

const [product, setProduct] = useState<Product | null>(null)
useEffect(()=>{
const token =PubSub.subscribe('products', (msg, data)=>{
  setProduct(data)
})
return ()=>{
  PubSub.unsubscribe(token)
}

},[])

const deleteById = async ()=>{
  const response = await productService.deleteProductById(product!.id);
  if(response.status ===200){
    setProduct(null)
    onDeleteproductById(product!.id);
    // PubSub.publish('delete', product!.id)
  }

};
  return (
   <div className='col'>
   {product? (
    
      <>
        <p>Product Id:{product.id}</p>
        <p>Product Title:{product.title}</p>
        <p>Product Price :{product.price}</p>
        <p>Product Description:{product.description}</p>

        <p>
          <button className="btn btn-danger" onClick={deleteById}>Delete</button>
        </p>
      </>
  
   ):<h2>PLease click a product on left side to see detail</h2>

   }
   </div>
  );
}
