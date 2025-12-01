import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">About Novacart</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        We are redefining the digital shopping experience with quality, innovation, and customer-centric design.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-6 animate-fade-in-up stagger-1">
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            At Novacart, our mission is simple: to provide a curated selection of premium products that elevate your everyday life. We believe that shopping should be seamless, inspiring, and reliable.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Founded in 2025, we have quickly grown from a small startup to a trusted global brand, thanks to our unwavering commitment to quality and customer satisfaction.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span>Premium Quality Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span>24/7 Customer Support</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-primary h-5 w-5" />
                                <span>Fast & Secure Shipping</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[400px] rounded-3xl overflow-hidden glass-card animate-fade-in-up stagger-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 z-0"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-9xl font-bold text-primary/10">2025</span>
                        </div>
                    </div>
                </div>

                <div className="text-center animate-fade-in-up stagger-3">
                    <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Be part of our growing community. Follow us on social media or subscribe to our newsletter for the latest updates.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/products">Explore Our Collection</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
