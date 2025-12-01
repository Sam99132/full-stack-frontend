"use client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import SignupForm from "@/components/auth/signup-form";
export default function SignupPage() {
    return (<main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8 space-y-8">
          {}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground">Join us today and get started in minutes</p>
          </div>

          {}
          <SignupForm />

          {}
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </main>);
}
