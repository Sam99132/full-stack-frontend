"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/api";
export default function LoginForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }
        else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await login(formData.email, formData.password);
            toast({
                title: "Success!",
                description: response.message || "You have been logged in successfully.",
            });
            router.push("/dashboard");
        }
        catch (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to log in. Please try again.",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };
    return (<form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email Address
        </Label>
        <Input id="email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} disabled={isLoading} className="h-10" aria-describedby={errors.email ? "email-error" : undefined}/>
        {errors.email && (<p id="email-error" className="text-sm text-destructive">
            {errors.email}
          </p>)}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <Input id="password" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} disabled={isLoading} className="h-10" aria-describedby={errors.password ? "password-error" : undefined}/>
        {errors.password && (<p id="password-error" className="text-sm text-destructive">
            {errors.password}
          </p>)}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full h-10 font-medium">
        {isLoading ? "Logging in..." : "Log In"}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"/>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Social Login */}
      <Button type="button" variant="outline" className="w-full h-10 bg-transparent" onClick={() => toast({
            description: "Social login feature coming soon!",
        })}>
        Continue with Google
      </Button>
    </form>);
}
