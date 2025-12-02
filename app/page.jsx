"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, Clock } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen">
            { }
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-background">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background z-0"></div>
                <div className="container px-4 mx-auto relative z-10 text-center">
                    <div className="animate-fade-in-up">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                            New Collection 2025
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            Redefine Your <br /> Shopping Experience
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            Discover a curated selection of premium products designed to elevate your lifestyle.
                            Quality, style, and innovation in every item.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/products"
                                className={cn(buttonVariants({ size: "lg" }), "text-lg h-12 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all")}
                            >
                                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/about"
                                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-lg h-12 px-8 rounded-full border-2 hover:bg-secondary/50")}
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    { }
                    <div className="absolute top-1/2 left-10 hidden lg:block animate-float opacity-50">
                        <div className="glass p-4 rounded-2xl">
                            <ShoppingBag className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                    <div className="absolute bottom-1/4 right-10 hidden lg:block animate-float opacity-50" style={{ animationDelay: '2s' }}>
                        <div className="glass p-4 rounded-2xl">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                        </div>
                    </div>
                </div>
            </section>

            { }
            <section className="py-24 bg-muted/30">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                                <Truck className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Free Worldwide Shipping</h3>
                            <p className="text-muted-foreground">On all orders over $150. We deliver to your doorstep, wherever you are.</p>
                        </div>
                        <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                                <ShieldCheck className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
                            <p className="text-muted-foreground">Your security is our priority. We use state-of-the-art encryption for all transactions.</p>
                        </div>
                        <div className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                                <Clock className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                            <p className="text-muted-foreground">Our dedicated support team is available around the clock to assist you.</p>
                        </div>
                    </div>
                </div>
            </section>

            { }
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110"></div>
                <div className="container px-4 mx-auto relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Upgrade Your Lifestyle?</h2>
                    <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who have found their perfect products with Novacart.
                    </p>
                    <Link
                        href="/signup"
                        className={cn(buttonVariants({ size: "lg" }), "text-lg h-14 px-10 rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all")}
                    >
                        Create Your Account
                    </Link>
                </div>
            </section>
        </main>
    );
}
