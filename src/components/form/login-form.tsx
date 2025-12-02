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
import PasswordInput from "@/components/input/password-input";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("Login data:", data);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!data.email || !String(data.email).includes("@")) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    }
    if (!data.password || String(data.password).length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters.",
      }));
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
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
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              required
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-sm font-medium text-destructive">
                {errors.password}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-4">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Spinner className="mr-2" />}
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
