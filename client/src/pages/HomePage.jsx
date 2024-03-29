import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import CarouselSlides from '../components/navigation/CarouselSlides'
import { useProduct } from '../context/productContext'
import ProductHeader from '../components/sections/ProductHeader';
import ServicesSlider from '../components/sections/ServicesSlider';
import About from '../components/sections/About';
import Testimonials from '../components/sections/Testimonials';
function HomePage() {
  const { getProducts, products } = useProduct();
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!dataLoaded) {
        await getProducts();
        setDataLoaded(true);
      }
    };

    fetchData();
  }, [dataLoaded, getProducts]);
  return (
    <div className='bg-[#FBECDA] '>
      <CarouselSlides />
      <ProductHeader title={'¡Lo Nuevo!'} />
      {/* Esperando datos de los productos, si llegan se enseñan las card si no el spiner de carga */}
      {
        dataLoaded ? (
          <div className="grid grid-cols-1 py-5 sm:grid-cols-2 md:grid-cols-3 md:px-20 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id} className="flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className='pt-32 flex justify-center items-center'>
            <div className="relative">
              <div className="w-20 h-20 border-purple-200 border-2 rounded-full"></div>
              <div className="w-20 h-20 border-primary border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
            </div>
          </div>
        )
      }
      <ProductHeader title={"¡Revisa Nuesto Menu!"} />
      <ServicesSlider />
      <About />
      <Testimonials />
    </div>
  )
}

export default HomePage
