import React, {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './product.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addCart} from '../redux/action';
import axios from 'axios';


export default function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const[sortBtn,setSortBtn] =useState("Sort by Price");
   
    let componentMounted = true;
    const getProducts = async () => {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if(componentMounted){
            setData(await response.clone().json());
            setFilter(await response.json());
            setLoading(false);
            console.log(filter);
        }

        return () => {
            componentMounted = false;
        }
    }

    useEffect(() => {
     

        getProducts();
    }, []);

    const dispatch = useDispatch();
    const addProduct = (product) => {
      dispatch(addCart(product));
    }

    const Loading = () => {
        return(
            <>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        )
    }

//   function DeleteUser(id){
  
//       fetch(`https://fakestoreapi.com/products/${id}`,{
//         method: 'DELETE',
//       }).then((result)=>{
//              result.json().then((resp)=>{
//                 alert("Deleted");
               
//              })
//       })
//   }

async function DeleteUser(id) {
    await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
    alert('Delete successful');
    const updateList = data.filter((x)=>x.id !== id);
    setFilter(updateList);
}
 




    const filterProduct = (cat) => {
        const updateList = data.filter((x)=>x.category === cat);
        setFilter(updateList);
    }


    const filterPrice=(data)=>{
        var priceList=data;
        if(sortBtn==="Sort by Price"){
         priceList=data.sort((a,b)=>{
            
            setSortBtn("Remove Sort");
              return a.price-b.price;
          });
          return setFilter(priceList);
        }else{
          setSortBtn("Sort by Price");
          return getProducts();
        }
    
      }
    const ShowProducts = () => {
        return (
            <>
            <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn  btn-outline-dark" onClick={()=>setFilter(data)}>Shop All</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("men's clothing")}>Men's Clothing</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("women's clothing")}>Women's Clothing</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn  btn-outline-dark" onClick={()=>filterProduct("electronics")}>Electronic</button>
                    <nutton className="btn  btn-outline-dark" onClick={()=>filterPrice(data)}>{sortBtn}</nutton>
                </div>
                {filter.map((product) => {
                    return (
                        <>

                    
                            <div className="col-md-3 mb-4" id="p">
                                <div class="card h-100 text-center p-4" key={product.id}>
                                    <img src={product.image} class="card-img-top" alt={product.title} height="250px" />
                                    <div class="card-body">
                                        <h5 class="card-title mb-0">{product.title.substring(0,20)}...</h5>
                                        <p class="card-text lead fw-bold">${product.price}</p>

                                        <button class="btn btn-primary" onClick={()=>addProduct(product)}>ADD TO CART</button>
                                        <Link to={`/products/${product.id}`} class="btn btn-dark" style={{marginLeft:"20px"}}>Details</Link>
                                        <button style={{marginLeft:"10px", backgroundColor:"white" , border:"none" ,color:"red"}}  onClick={()=>DeleteUser(product.id)}><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                            </div>
                       
                        </>
                    )
                })}
            </>
        )

    }

  return (
    <div className='home'>
        <div>
                <div className="row">
                    <div>
                        <p>Best Seller</p>
                        <br></br>
                    </div>
                </div>
                <div className="row">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
    </div>
  )
}