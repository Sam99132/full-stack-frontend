import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
    return (
        <main className="min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Frequently Asked Questions</h1>
                    <p className="text-xl text-muted-foreground">
                        Find answers to common questions about our products, shipping, and returns.
                    </p>
                </div>

                <div className="glass-card p-8 rounded-2xl animate-fade-in-up stagger-1">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                            <AccordionContent>
                                Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 business day delivery.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What is your return policy?</AccordionTrigger>
                            <AccordionContent>
                                We offer a 30-day return policy for all unused items in their original packaging. Simply contact our support team to initiate a return.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                            <AccordionContent>
                                Yes, we ship to most countries worldwide. International shipping rates and times vary depending on the destination.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>How can I track my order?</AccordionTrigger>
                            <AccordionContent>
                                Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order status in your dashboard.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Are your products covered by warranty?</AccordionTrigger>
                            <AccordionContent>
                                Yes, all our electronics come with a 1-year manufacturer warranty. Other products may have different warranty terms listed on their product page.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </main>
    );
}
