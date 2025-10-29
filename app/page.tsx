import Banner from '@/components/Banner';
import DisplayProducts from '@/components/DisplayProducts';
import Filter from '@/components/Filter';
import Navbar from '@/components/Navbar';
import axios from 'axios';

export const revalidate = false;

async function fetchProducts(){
  const res = await fetch(`${process.env.BACKEND_ROOT_API}/api/v1/user/products`, {
    next : {
      revalidate : false
    }
  })
  const data = await res.json()
  return data.products
}

export default async function Home() {
  const products_list = await fetchProducts()
  return (
    <div className='min-h-screen max-w-screen bg-linear-to-r from-orange-100 via-white to-orange-100 m-0 pt-4'>
      <Navbar/>
      <Banner/>
      <DisplayProducts products={products_list}/>
    </div>
  );
}
