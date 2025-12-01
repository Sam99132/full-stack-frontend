import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
    return (
        <footer className="bg-muted/30 border-t pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Novacart</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Experience the future of shopping with Novacart. Premium products, seamless service, and a community of happy customers.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 rounded-full">
                                <Linkedin className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    {}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Categories</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/products?category=Electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
                            <li><Link href="/products?category=Fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
                            <li><Link href="/products?category=Home" className="hover:text-primary transition-colors">Home & Living</Link></li>
                            <li><Link href="/products?category=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    {}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
                        <p className="text-muted-foreground text-sm mb-4">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
                        <div className="flex space-x-2">
                            <Input placeholder="Enter your email" className="bg-background" />
                            <Button size="icon">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Novacart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
