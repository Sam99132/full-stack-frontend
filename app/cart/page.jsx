"use client";
import { useEffect, useState } from "react";
import { getCart, updateQuantity, removeFromCart, clearCart } from "@/lib/cart";
import { createOrder, getToken } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        
        setCart(getCart());

        
        const handleCartUpdate = () => setCart(getCart());
        window.addEventListener('cart-updated', handleCartUpdate);

        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    const total = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

    const handleCheckout = async () => {
        const token = getToken();
        if (!token) {
            toast({
                title: "Login required",
                description: "Please log in to complete your purchase.",
                variant: "destructive",
            });
            router.push("/login?redirect=/cart");
            return;
        }

        setLoading(true);
        try {
            
            const orderItems = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: Number(item.price)
            }));

            await createOrder(orderItems, total);

            clearCart();
            toast({
                title: "Order placed!",
                description: "Your order has been placed successfully.",
            });
            router.push("/orders");
        } catch (error) {
            toast({
                title: "Checkout failed",
                description: error.message || "Failed to place order. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <main className="container mx-auto py-12 px-4 text-center min-h-screen flex flex-col items-center justify-center">
                <div className="bg-muted/30 p-8 rounded-full mb-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild size="lg">
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </main>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card shadow-sm">
                            <div className="h-24 w-24 bg-muted rounded-md overflow-hidden flex-shrink-0">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground bg-secondary">No Image</div>
                                )}
                            </div>

                            <div className="flex-grow flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                                    </div>
                                    <p className="font-bold text-lg">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center border rounded-md h-8">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-full w-8 rounded-none"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-full w-8 rounded-none"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" /> Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-card shadow-sm sticky top-4">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>Free</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Checkout"}
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
