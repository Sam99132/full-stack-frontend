"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { signup } from "@/lib/api";
export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const response = await signup(formData.email, formData.password, formData.fullName);
      toast({
        title: "Account Created",
        description: "Welcome to Novacart!",
      });
      router.push("/dashboard");
    }
    catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  return (<form onSubmit={handleSubmit} className="space-y-5">
    {}
    <div className="space-y-2">
      <Label htmlFor="fullName" className="text-sm font-medium">
        Full Name
      </Label>
      <Input id="fullName" type="text" name="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} disabled={isLoading} className="h-10" aria-describedby={errors.fullName ? "fullName-error" : undefined} />
      {errors.fullName && (<p id="fullName-error" className="text-sm text-destructive">
        {errors.fullName}
      </p>)}
    </div>

    {}
    <div className="space-y-2">
      <Label htmlFor="email" className="text-sm font-medium">
        Email Address
      </Label>
      <Input id="email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} disabled={isLoading} className="h-10" aria-describedby={errors.email ? "email-error" : undefined} />
      {errors.email && (<p id="email-error" className="text-sm text-destructive">
        {errors.email}
      </p>)}
    </div>

    {}
    <div className="space-y-2">
      <Label htmlFor="password" className="text-sm font-medium">
        Password
      </Label>
      <Input id="password" type="password" name="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} disabled={isLoading} className="h-10" aria-describedby={errors.password ? "password-error" : undefined} />
      {errors.password && (<p id="password-error" className="text-sm text-destructive">
        {errors.password}
      </p>)}
    </div>

    {}
    <div className="space-y-2">
      <Label htmlFor="confirmPassword" className="text-sm font-medium">
        Confirm Password
      </Label>
      <Input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} disabled={isLoading} className="h-10" aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined} />
      {errors.confirmPassword && (<p id="confirmPassword-error" className="text-sm text-destructive">
        {errors.confirmPassword}
      </p>)}
    </div>

    {}
    <Button type="submit" disabled={isLoading} className="w-full h-10 font-medium">
      {isLoading ? "Creating account..." : "Create Account"}
    </Button>

    {}
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">Or</span>
      </div>
    </div>

    {}
    <Button type="button" variant="outline" className="w-full h-10 bg-transparent" onClick={() => toast({
      description: "Social signup feature coming soon!",
    })}>
      Continue with Google
    </Button>

    {}
    <p className="text-xs text-center text-muted-foreground">
      By signing up, you agree to our <button className="underline hover:text-foreground">Terms</button> and{" "}
      <button className="underline hover:text-foreground">Privacy Policy</button>
    </p>
  </form>);
}
