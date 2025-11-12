"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export default function DashboardPage() {
    const router = useRouter();
    return (<main className="min-h-screen bg-gradient-to-br from-background to-muted p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back! You are now logged in.</p>
          </div>
          <Button onClick={() => router.push("/")} variant="outline">
            Logout
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Profile</h3>
            <p className="text-sm text-muted-foreground">View and manage your profile information</p>
            <Button variant="outline" className="w-full bg-transparent">
              View Profile
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Settings</h3>
            <p className="text-sm text-muted-foreground">Update your account preferences</p>
            <Button variant="outline" className="w-full bg-transparent">
              Go to Settings
            </Button>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <p className="text-sm text-muted-foreground">Get help and contact support team</p>
            <Button variant="outline" className="w-full bg-transparent">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </main>);
}
