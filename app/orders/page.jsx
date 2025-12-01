"use client";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
            setError("Failed to load orders. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <h1 className="text-2xl font-bold text-destructive mb-4">{error}</h1>
                <Button onClick={fetchOrders} variant="outline">Retry</Button>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <main className="container mx-auto py-12 px-4 text-center min-h-screen flex flex-col items-center justify-center">
                <div className="bg-muted/30 p-8 rounded-full mb-6">
                    <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
                <p className="text-muted-foreground mb-8">You haven't placed any orders yet.</p>
                <Button asChild size="lg">
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </main>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg overflow-hidden bg-card shadow-sm">
                        <div className="bg-muted/30 p-4 flex flex-wrap gap-4 justify-between items-center border-b">
                            <div className="flex gap-6 text-sm">
                                <div>
                                    <p className="text-muted-foreground font-medium">Order Placed</p>
                                    <p>{format(new Date(order.createdAt), "MMM d, yyyy")}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground font-medium">Total</p>
                                    <p className="font-bold">${Number(order.total).toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground font-medium">Status</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                        order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Order #{order.id}
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="space-y-4">
                                {order.items?.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                                                {item.product?.imageUrl ? (
                                                    <img src={item.product.imageUrl} alt={item.product.name} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">No Img</div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.product?.name || `Product ID: ${item.productId}`}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium">${Number(item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
