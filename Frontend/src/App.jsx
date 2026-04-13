import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/HomePage/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProductBlog from "./components/ProductBlog";

const Home = lazy(() => import("./components/HomePage/Home"));
const Phones = lazy(() => import("./components/Phones"));
const Laptops = lazy(() => import("./components/Laptops"));
const Tablets = lazy(() => import("./components/Tablets"));
// const PhoneBlog = lazy(() => import("./components/PhoneBlog"));
// const LaptopBlog = lazy(() => import("./components/LaptopBlog"));
// const TabletBlog = lazy(() => import("./components/TabletBlog"));
const About = lazy(() => import("./components/HomePage/About"));
const Filter = lazy(() => import("./components/Filter"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Navbar />
        <Suspense
          fallback={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phone" element={<Phones />} />
            <Route path="/laptop" element={<Laptops />} />
            <Route path="/tablet" element={<Tablets />} />
            <Route path="/about" element={<About />} />
            <Route path="/filter" element={<Filter />} />
            <Route path="/:productType/:itname" element={<ProductBlog />} />
            {/* <Route path="/phone/:itname" element={<PhoneBlog />} /> */}
            {/* <Route path="/laptop/:itname" element={<LaptopBlog />} /> */}
            {/* <Route path="/tablet/:itname" element={<TabletBlog />} /> */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
