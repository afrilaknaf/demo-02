import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Compoents/Navbar'
import Footer from './Compoents/Footer'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import MobileMenu from './Compoents/MobileMenu'
import Products from './Pages/Products'
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import ScrollTop from './Compoents/scrollTop'
import Blog from './Compoents/Blog'
import BlogPage from './Pages/BlogPage'
import QuickView from './Compoents/QuickView'
import PremiumProducts from './Pages/PremiumProducts'
import Carousel from './Compoents/carousel'
import ProductsQuickview from './Compoents/ProductsQuickView'
import Wishlist from './Pages/wishlist'
import Cart from './Pages/cart'


function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false
    })
  }, [])

  return (
    <>
      <div className='overflow-x-hidden'>
        <Navbar />
        <ScrollTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/products' element={<Products />} />
          <Route path='/preimum' element={<PremiumProducts />} />
          <Route path='/blog' element={<Blog/>}/>
          <Route path='/blog/:id/:slug' element={<BlogPage />} />
          <Route path='/quick/:id' element={<QuickView />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path='/quick/products/:id' element={<ProductsQuickview/>}/>
          <Route path='/wishlist' element={<Wishlist/>} />
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
        <Footer />
        <MobileMenu />
      </div>
    </>
  )
}

export default App
