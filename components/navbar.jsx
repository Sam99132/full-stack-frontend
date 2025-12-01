"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getToken, removeToken } from "@/lib/api";
import { getCart } from "@/lib/cart";

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        
        setIsLoggedIn(!!getToken());

        
        updateCartCount();

        
        const handleCartUpdate = () => updateCartCount();
        window.addEventListener('cart-updated', handleCartUpdate);

        
        const handleStorageChange = () => {
            setIsLoggedIn(!!getToken());
            updateCartCount();
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('cart-updated', handleCartUpdate);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    
    useEffect(() => {
        const checkAuth = () => setIsLoggedIn(!!getToken());
        
        checkAuth();
    }, [router]); 

    const updateCartCount = () => {
        const cart = getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
    };

    const handleLogout = () => {
        removeToken();
        setIsLoggedIn(false);
        router.push('/login');
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 mx-auto">
                <div className="mr-4 hidden md:flex">
                    <Link href="/products" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Novacart</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/products" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Products
                        </Link>
                        {isLoggedIn && (
                            <>
                                <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    Dashboard
                                </Link>
                                <Link href="/orders" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    Orders
                                </Link>
                            </>
                        )}
                    </nav>
                </div>

                {}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <Link href="/products" className="flex items-center" onClick={() => { }}>
                            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Novacart</span>
                        </Link>
                        <div className="my-4 pb-10 pl-6">
                            <div className="flex flex-col space-y-3">
                                <Link href="/products">Products</Link>
                                {isLoggedIn && (
                                    <>
                                        <Link href="/dashboard">Dashboard</Link>
                                        <Link href="/orders">Orders</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>

                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {}
                    </div>
                    <nav className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="icon" className="relative">
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                                <span className="sr-only">Cart</span>
                            </Link>
                        </Button>

                        {isLoggedIn ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                        <span className="sr-only">User menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/orders">Orders</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button asChild variant="default" size="sm">
                                <Link href="/login">Login</Link>
                            </Button>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
