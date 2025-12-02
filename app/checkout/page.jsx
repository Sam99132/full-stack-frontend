"use client";
import { useEffect, useState } from "react";
import { getCart, clearCart } from "@/lib/cart";
import { createOrder, getToken } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import AddressModal from "@/components/address-modal";
import { CheckCircle2, MapPin, Package } from "lucide-react";

export default function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            toast({
                title: "Login required",
                description: "Please log in to checkout.",
                variant: "destructive",
            });
            router.push("/login?redirect=/checkout");
            return;
        }

        const cartItems = getCart();
        if (cartItems.length === 0) {
            router.push("/cart");
            return;
        }

        setCart(cartItems);
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch profile");
            }

            setUser(data);

            // Check if address is missing
            if (!data.address || !data.city || !data.state || !data.postalCode || !data.country) {
                setShowAddressModal(true);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!user?.address) {
            setShowAddressModal(true);
            return;
        }

        setPlacingOrder(true);
        try {
            const orderItems = cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: Number(item.price),
            }));

            const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

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
            setPlacingOrder(false);
        }
    };

    const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Order Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <div className="border rounded-lg p-6 bg-card shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">Shipping Address</h2>
                        </div>

                        {user?.address ? (
                            <div className="space-y-1 text-sm">
                                <p className="font-medium">{user.name || "N/A"}</p>
                                <p>{user.address}</p>
                                <p>
                                    {user.city}, {user.state} {user.postalCode}
                                </p>
                                <p>{user.country}</p>
                                <p className="text-muted-foreground">Phone: {user.phone}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                    onClick={() => setShowAddressModal(true)}
                                >
                                    Edit Address
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-muted-foreground mb-4">No shipping address on file</p>
                                <Button onClick={() => setShowAddressModal(true)}>
                                    Add Shipping Address
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Order Items */}
                    <div className="border rounded-lg p-6 bg-card shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Package className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">Order Items</h2>
                        </div>

                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                                        </p>
                                    </div>
                                    <p className="font-semibold">
                                        ${(Number(item.price) * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
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
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax</span>
                                <span>$0.00</span>
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
                            onClick={handlePlaceOrder}
                            disabled={placingOrder || !user?.address}
                        >
                            {placingOrder ? (
                                "Processing..."
                            ) : (
                                <>
                                    <CheckCircle2 className="mr-2 h-5 w-5" />
                                    Place Order
                                </>
                            )}
                        </Button>

                        {!user?.address && (
                            <p className="text-xs text-destructive text-center mt-2">
                                Please add a shipping address to continue
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            <AddressModal
                isOpen={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                onAddressSaved={(updatedUser) => {
                    setUser(updatedUser);
                    toast({
                        title: "Address saved",
                        description: "Your shipping address has been updated.",
                    });
                }}
                initialData={user || {}}
            />
        </main>
    );
}
