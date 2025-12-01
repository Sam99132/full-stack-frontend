"use client";
import { useEffect, useState, use } from "react";
import { getProduct } from "@/lib/api";
import { addToCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";

export default function ProductPage({ params }) {
    
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { toast } = useToast();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (productId) => {
        try {
            const data = await getProduct(productId);
            setProduct(data);
        } catch (err) {
            console.error("Failed to fetch product:", err);
            setError("Failed to load product details.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;

        addToCart(product, quantity);
        toast({
            title: "Added to cart",
            description: `${quantity} x ${product.name} added to your cart.`,
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <h1 className="text-2xl font-bold text-destructive mb-4">{error || "Product not found"}</h1>
                <Button asChild variant="outline">
                    <Link href="/products">Back to Products</Link>
                </Button>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4 min-h-screen">
            <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/products" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Products
                </Link>
            </Button>

            <div className="grid md:grid-cols-2 gap-12">
                {}
                <div className="aspect-square bg-muted rounded-xl overflow-hidden relative">
                    {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-xl bg-secondary">No Image Available</div>
                    )}
                </div>

                {}
                <div className="flex flex-col justify-center space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                        <p className="text-2xl font-semibold text-primary">${Number(product.price).toFixed(2)}</p>
                    </div>

                    <div className="prose prose-sm text-muted-foreground">
                        <p>{product.description}</p>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">Quantity:</span>
                            <div className="flex items-center border rounded-md">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-10 text-center text-sm">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                            </span>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                className="w-full md:w-auto flex-1 gap-2"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
