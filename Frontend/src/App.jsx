import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/HomePage/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const ProductBlog = lazy(() => import("./components/ProductBlog"));
const SearchPage = lazy(() => import("./components/pages/searchPage"));
const Home = lazy(() => import("./components/HomePage/Home"));
const Phones = lazy(() => import("./components/Phones"));
const Laptops = lazy(() => import("./components/Laptops"));
const Tablets = lazy(() => import("./components/Tablets"));
const About = lazy(() => import("./components/HomePage/About"));
const Filter = lazy(() => import("./components/Filter"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />

      <Router>
        <div className="min-h-screen flex flex-col">
          <ScrollToTop />

          {/* HEADER */}
          <Navbar />

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            <Suspense
              fallback={<div className="p-8 text-center">Loading...</div>}
            >
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/phone" element={<Phones />} />
                <Route path="/laptop" element={<Laptops />} />
                <Route path="/tablet" element={<Tablets />} />

                {/* 🔥 SEARCH PAGE */}
                <Route path="/search" element={<SearchPage />} />

                <Route path="/about" element={<About />} />
                <Route path="/filter" element={<Filter />} />

                {/* 🔥 PRODUCT PAGE (MUST BE LAST) */}
                <Route path="/:productType/:itname" element={<ProductBlog />} />

                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>

          {/* FOOTER */}
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
