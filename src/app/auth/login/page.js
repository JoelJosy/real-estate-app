"use client"

import { useAuth } from "@/app/contexts/AuthContext"
import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get("mode") === "signup" ? "signup" : "login")
  const [userRole, setUserRole] = useState("buyer")

  const { updateLoginState } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault()

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userRole", userRole)
    updateLoginState(true, userRole);
    router.push("/")
  }

  const handleSignup = (e) => {
    e.preventDefault()

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userRole", userRole)

    router.push("/")
  }

  return (
    <div className="container flex items-center justify-center px-4 py-12">
      <Card className="mx-auto w-full max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader className="mt-4">
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="mt-4">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" required />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required />
                </div>

                <div className="space-y-2 mb-8">
                  <Label>Account Type</Label>
                  <RadioGroup defaultValue="buyer" onValueChange={(value) => setUserRole(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="login-buyer" />
                      <Label htmlFor="login-buyer">Buyer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seller" id="login-seller" />
                      <Label htmlFor="login-seller">Seller</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup}>
              <CardHeader className="mt-4">
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Enter your details to create a new account</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="name@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>

                <div className="space-y-2 mb-8">
                  <Label>Account Type</Label>
                  <RadioGroup defaultValue="buyer" onValueChange={(value) => setUserRole(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buyer" id="signup-buyer" />
                      <Label htmlFor="signup-buyer">I want to buy properties</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seller" id="signup-seller" />
                      <Label htmlFor="signup-seller">I want to sell properties</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}