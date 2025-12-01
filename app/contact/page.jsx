"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Contact Us</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you. Our team is always here to help.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in-up stagger-1">
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow glass-card">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                        <p className="text-muted-foreground mb-4">support@novacart.com</p>
                        <Button variant="outline" size="sm">Send Email</Button>
                    </Card>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow glass-card">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                        <p className="text-muted-foreground mb-4">+1 (555) 123-4567</p>
                        <Button variant="outline" size="sm">Call Now</Button>
                    </Card>
                    <Card className="p-6 text-center hover:shadow-lg transition-shadow glass-card">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                        <p className="text-muted-foreground mb-4">123 Commerce St, Tech City</p>
                        <Button variant="outline" size="sm">Get Directions</Button>
                    </Card>
                </div>

                <div className="max-w-2xl mx-auto glass-card p-8 rounded-2xl animate-fade-in-up stagger-2">
                    <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
                        </div>
                        <Button className="w-full" size="lg">Send Message</Button>
                    </form>
                </div>
            </div>
        </main>
    );
}
