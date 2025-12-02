"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string }>({});
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("Forgot password data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock validation/error
    if (!data.email || !String(data.email).includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setSuccess(true);
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm font-medium text-destructive">
                {errors.email}
              </p>
            )}
            {success && (
              <p className="text-sm font-medium text-green-600">
                Reset link sent to your email!
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Spinner className="mr-2" />}
            Send Reset Link
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
