"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { removeToken, getToken } from "@/lib/api";
import { CheckCircle2, LogOut, User, Mail, Calendar } from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({
                email: payload.email,
                userId: payload.userId,
            });
            fetchOrders();
        } catch (error) {
            console.error("Error decoding token:", error);
        }
        setLoading(false);
    }, [router]);

    const fetchOrders = async () => {
        try {
            const { getOrders } = require("@/lib/api");
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const handleLogout = () => {
        removeToken();
        router.push("/login");
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </main>
        );
    }

    const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);

    return (
        <main className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome back, {user?.email}</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                </div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm font-medium">Total Orders</span>
                        </div>
                        <p className="text-3xl font-bold">{orders.length}</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4" />
                            <span className="text-sm font-medium">Total Spent</span>
                        </div>
                        <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
                    </Card>
                    <Card className="p-6 space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">Account Status</span>
                        </div>
                        <p className="text-3xl font-bold text-green-500">Active</p>
                    </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-semibold">Recent Orders</h2>
                        {orders.length === 0 ? (
                            <Card className="p-8 text-center text-muted-foreground">
                                <p>No orders yet.</p>
                                <Button variant="link" onClick={() => router.push('/products')}>Start Shopping</Button>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {orders.slice(0, 5).map(order => (
                                    <Card key={order.id} className="p-6 flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">Order #{order.id}</p>
                                            <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${parseFloat(order.total).toFixed(2)}</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {order.status}
                                            </span>
                                        </div>
                                    </Card>
                                ))}
                                {orders.length > 5 && (
                                    <Button variant="outline" className="w-full" onClick={() => router.push('/orders')}>
                                        View All Orders
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    {}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Quick Actions</h2>
                        <div className="space-y-4">
                            <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => router.push('/products')}>
                                <h3 className="font-medium mb-1">Browse Products</h3>
                                <p className="text-sm text-muted-foreground">Discover our latest collection</p>
                            </Card>
                            <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => router.push('/cart')}>
                                <h3 className="font-medium mb-1">View Cart</h3>
                                <p className="text-sm text-muted-foreground">Check your shopping cart</p>
                            </Card>
                            <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => router.push('/profile')}>
                                <h3 className="font-medium mb-1">Profile Settings</h3>
                                <p className="text-sm text-muted-foreground">Update your information</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
