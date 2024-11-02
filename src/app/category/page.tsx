/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Use this to get query params
import { TProductItem } from "@/Types";
import ProductCard from "@/components/ui/ProductCard";
import NavbarMain from "@/components/Shared/NavbarMain";
import Footer from "@/components/Shared/Footer";

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<TProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TProductItem[]>([]);

  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // Extract 'category' from the query

  // Get the backend URL from environment variables
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/product`);
        if (!res.ok) throw new Error(`Error: ${res.statusText}`);

        const data = await res.json();
        setProducts(data.data);

        // Filter products based on the category from the query
        if (category) {
          const filtered = data.data.filter(
            (product: TProductItem) => product.category === category
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts(data.data); // Show all products if no category is selected
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <NavbarMain />
      <section className="py-[50px] md:py-[75px] px-4">
        <div className="max-w-Container mx-auto px-5 xl:px-0">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-semibold gradient mb-3">
              {category ? `${category} Products` : "Products"}
            </h2>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} item={product} /> // Use ProductCard for rendering
              ))
            ) : (
              <p className="text-center">No products found in this category.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CategoryPage;
