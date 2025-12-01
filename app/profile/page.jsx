"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getToken } from "@/lib/api";
import { useRouter } from "next/navigation";
import { User, Mail, Save } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser({
                name: payload.name || "User", 
                email: payload.email
            });
        } catch (error) {
            console.error("Error decoding token:", error);
        } finally {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-12 px-4 bg-muted/30">
            <div className="container mx-auto max-w-2xl">
                <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

                <Card className="p-8 glass-card">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User className="h-10 w-10" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{user.email}</h2>
                            <p className="text-sm text-muted-foreground">Manage your account details</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                Full Name
                            </label>
                            <Input defaultValue={user.name} placeholder="Enter your name" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                Email Address
                            </label>
                            <Input defaultValue={user.email} disabled className="bg-muted" />
                            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                        </div>

                        <div className="pt-4">
                            <Button className="w-full">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </main>
    );
}
