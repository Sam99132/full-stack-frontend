"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/auth/login-form";
export default function LoginPage() {
    return (<main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Log In</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <LoginForm />

          {/* Footer */}
          <div className="space-y-4 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up
              </Link>
            </p>
            <Link href="#" className="text-xs text-muted-foreground hover:underline block">
              Forgot your password?
            </Link>
          </div>
        </div>
      </Card>
    </main>);
}
