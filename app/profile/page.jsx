"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getToken } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, MapPin, Phone } from "lucide-react";
import AddressModal from "@/components/address-modal";

export default function ProfilePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }

        fetchUserProfile();
    }, [router]);

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

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </main>
        );
    }

    const hasAddress = user?.address && user?.city && user?.state && user?.postalCode && user?.country;

    return (
        <main className="min-h-screen py-12 px-4 bg-muted/30">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

                {/* User Info Card */}
                <Card className="p-8 mb-6">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User className="h-10 w-10" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Member since {new Date(user?.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                Full Name
                            </label>
                            <p className="text-base px-3 py-2 border rounded-md bg-muted/50">
                                {user?.name || "Not set"}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium flex items-center gap-2 mb-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                Email Address
                            </label>
                            <p className="text-base px-3 py-2 border rounded-md bg-muted/50">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Address Card */}
                <Card className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <h2 className="text-xl font-semibold">Shipping Address</h2>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddressModal(true)}
                        >
                            {hasAddress ? "Edit Address" : "Add Address"}
                        </Button>
                    </div>

                    {hasAddress ? (
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="font-medium">{user.address}</p>
                                    <p className="text-muted-foreground">
                                        {user.city}, {user.state} {user.postalCode}
                                    </p>
                                    <p className="text-muted-foreground">{user.country}</p>
                                </div>
                            </div>
                            {user.phone && (
                                <div className="flex items-center gap-2 mt-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <p className="text-muted-foreground">{user.phone}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-muted-foreground mb-4">
                                No shipping address on file
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Add your address to make checkout faster
                            </p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Address Modal */}
            <AddressModal
                isOpen={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                onAddressSaved={(updatedUser) => {
                    setUser(updatedUser);
                    toast({
                        title: "Address saved",
                        description: "Your shipping address has been updated successfully.",
                    });
                }}
                initialData={user || {}}
            />
        </main>
    );
}
