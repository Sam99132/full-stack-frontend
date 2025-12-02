"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddressForm({ initialData = {}, onSubmit, onCancel, isLoading }) {
    const [formData, setFormData] = useState({
        address: initialData.address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        postalCode: initialData.postalCode || "",
        country: initialData.country || "",
        phone: initialData.phone || "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.address?.trim()) {
            newErrors.address = "Address is required";
        }
        if (!formData.city?.trim()) {
            newErrors.city = "City is required";
        }
        if (!formData.state?.trim()) {
            newErrors.state = "State is required";
        }
        if (!formData.postalCode?.trim()) {
            newErrors.postalCode = "Postal code is required";
        }
        if (!formData.country?.trim()) {
            newErrors.country = "Country is required";
        }
        if (!formData.phone?.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone number format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="123 Main Street"
                    className={errors.address ? "border-destructive" : ""}
                />
                {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        placeholder="New York"
                        className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                        <p className="text-sm text-destructive">{errors.city}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        placeholder="NY"
                        className={errors.state ? "border-destructive" : ""}
                    />
                    {errors.state && (
                        <p className="text-sm text-destructive">{errors.state}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleChange("postalCode", e.target.value)}
                        placeholder="10001"
                        className={errors.postalCode ? "border-destructive" : ""}
                    />
                    {errors.postalCode && (
                        <p className="text-sm text-destructive">{errors.postalCode}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) => handleChange("country", e.target.value)}
                        placeholder="United States"
                        className={errors.country ? "border-destructive" : ""}
                    />
                    {errors.country && (
                        <p className="text-sm text-destructive">{errors.country}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Address"}
                </Button>
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}
