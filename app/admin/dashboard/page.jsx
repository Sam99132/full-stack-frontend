"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/api";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        // Verify admin role (basic client-side check, real check happens on API)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.role !== 'ADMIN') {
                toast({
                    title: "Access Denied",
                    description: "You do not have permission to view this page.",
                    variant: "destructive",
                });
                router.push("/");
                return;
            }
        } catch (e) {
            router.push("/login");
            return;
        }

        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();
            setOrders(data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to load orders. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const token = getToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            toast({
                title: "Status Updated",
                description: `Order #${orderId} status changed to ${newStatus}`,
            });

            // Refresh orders
            fetchOrders();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update order status.",
                variant: "destructive",
            });
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'PENDING':
                return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
            case 'PROCESSING':
                return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20"><Package className="w-3 h-3 mr-1" /> Processing</Badge>;
            case 'SHIPPED':
                return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
            case 'DELIVERED':
                return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20"><CheckCircle className="w-3 h-3 mr-1" /> Delivered</Badge>;
            case 'CANCELLED':
                return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20"><AlertCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                    Total Orders: {orders.length}
                </Badge>
            </div>

            <Card className="overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">#{order.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{order.user?.name || 'Unknown'}</span>
                                        <span className="text-xs text-muted-foreground">{order.user?.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>${Number(order.total).toFixed(2)}</TableCell>
                                <TableCell>
                                    <div className="text-sm text-muted-foreground">
                                        {order.items.length} items
                                        <div className="text-xs truncate max-w-[200px]">
                                            {order.items.map(i => i.product?.name).join(', ')}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={order.status}
                                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">Pending</SelectItem>
                                            <SelectItem value="PROCESSING">Processing</SelectItem>
                                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </main>
    );
}
