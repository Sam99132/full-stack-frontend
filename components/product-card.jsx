"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import { useToast } from "@/components/ui/use-toast";

export default function ProductCard({ product, index = 0 }) {
    const { toast } = useToast();

    const handleAddToCart = () => {
        addToCart(product);
        toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    return (
        <Card
            className={`group overflow-hidden glass-card border-none ${index !== undefined ? `animate-fade-in-up stagger-${(index % 5) + 1}` : ''}`}
        >
            <div className="relative aspect-square overflow-hidden bg-muted/20">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button asChild variant="secondary" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Link href={`/products/${product.id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-sm text-primary font-medium mb-1">{product.category}</p>
                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                    </div>
                    <span className="font-bold text-lg text-foreground">${Number(product.price).toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
                <Button
                    onClick={handleAddToCart}
                    className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors group-hover:shadow-lg"
                >
                    Add to Cart
                </Button>
            </div>
        </Card>
    );
}
