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

    useEffect(() => {
        // Check if user is authenticated
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        // Decode JWT token to get user info (basic decode without verification)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({
                email: payload.email,
                userId: payload.userId,
            });
        } catch (error) {
            console.error("Error decoding token:", error);
        }
        setLoading(false);
    }, [router]);

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

    return (
        <main className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Success Header */}
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <div className="flex items-start justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-full">
                                    <CheckCircle2 className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-foreground">Welcome!</h1>
                                    <p className="text-muted-foreground mt-1">You have successfully logged in</p>
                                </div>
                            </div>
                        </div>
                        <Button onClick={handleLogout} variant="outline" className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </Card>

                {/* User Info Card */}
                {user && (
                    <Card className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground">Account Information</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                <Mail className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email Address</p>
                                    <p className="font-medium text-foreground">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">User ID</p>
                                    <p className="font-medium text-foreground">{user.userId}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Quick Actions */}
                <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Profile</h3>
                                <p className="text-sm text-muted-foreground">View and manage your profile information</p>
                            </div>
                            <Button variant="outline" className="w-full">
                                View Profile
                            </Button>
                        </Card>

                        <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Settings</h3>
                                <p className="text-sm text-muted-foreground">Update your account preferences</p>
                            </div>
                            <Button variant="outline" className="w-full">
                                Go to Settings
                            </Button>
                        </Card>

                        <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="p-3 bg-primary/10 rounded-lg w-fit">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground mb-1">Support</h3>
                                <p className="text-sm text-muted-foreground">Get help and contact support team</p>
                            </div>
                            <Button variant="outline" className="w-full">
                                Contact Support
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* Success Message */}
                <Card className="p-6 bg-green-500/10 border-green-500/20">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <div>
                            <p className="font-medium text-foreground">Authentication Successful</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Your session is active. You can now access all features.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}
