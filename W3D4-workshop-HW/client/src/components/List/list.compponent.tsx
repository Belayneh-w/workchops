import React, { useEffect, useState , MouseEvent} from 'react'
import PubSub from 'pubsub-js'
import classNames from 'classnames'
import Product from '../../types/product.type';
import productService from '../../apis/services/product.service';
import './List.css'



type Props = {
  products: Product[];
};

export default function List(props:Props) {

const { products} = props;
const [activeId, setActiveId] = useState<number>(-1);

const showDetail=(prod:Product)=>{
  PubSub.publish('products', prod);
//  e.currentTarget.classList.add('highlighted');
setActiveId(prod.id)
};
  return (
    <div className='row'>
      <div className="col">
        <ul className="list-group">
          {/* <li className="list-group-item">Node.js</li>
          <li className="list-group-item">React.js</li> */}
          {products.map((prod) => (
            <li
              key={prod.id}
              className={classNames("list-group-item", "list-group-item-action",{highlighted:activeId===prod.id})}
              
              onClick={(e) => showDetail(prod)}
            >
              {prod.title}
            </li>
          ))}
        </ul>
        <p>{/* <BiShuffle /> */}</p>
      </div>
    </div>
  );
}
