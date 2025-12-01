"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts();
    }, [page, search, category]); 

    const fetchProducts = async () => {
        setLoading(true);
        try {
            
            const query = new URLSearchParams({
                page,
                limit: 8, 
            });

            if (search) {
                query.append('search', search);
            }

            if (category) {
                query.append('category', category);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products?${query.toString()}`);
            const data = await response.json();

            if (data.products) {
                setProducts(data.products);
                setTotalPages(data.pagination.pages);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError("Failed to load products. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1); 
            fetchProducts();
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    return (
        <main className="container mx-auto py-8 px-4 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
                <div className="flex gap-4 w-full md:w-auto relative">
                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm pr-10"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : error ? (
                <div className="text-center text-destructive p-8 bg-destructive/10 rounded-lg">
                    <p>{error}</p>
                    <Button variant="outline" onClick={fetchProducts} className="mt-4">Retry</Button>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center text-muted-foreground p-12">
                    <p className="text-lg">No products found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {products.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    {}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            <Button
                                variant="outline"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <span className="flex items-center px-4 text-sm font-medium">
                                Page {page} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
