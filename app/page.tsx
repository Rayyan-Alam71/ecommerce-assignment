import Banner from '@/components/Banner';
import DisplayProducts from '@/components/DisplayProducts';
import Filter from '@/components/Filter';
import Navbar from '@/components/Navbar';
import productList from "@/data/products.json";

export const revalidate = 0;

export default function Home() {
  return (
    <div className='min-h-screen max-w-screen bg-linear-to-r from-orange-100 via-white to-orange-100 m-0 pt-4'>
      <Navbar/>
      <Banner/>
      <DisplayProducts products={productList}/>
    </div>
  );
}
