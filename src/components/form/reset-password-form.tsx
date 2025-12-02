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
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/input/password-input";
import { Spinner } from "@/components/ui/spinner";

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let hasError = false;
    const newErrors: typeof errors = {};

    // Mock validation
    if (!data.password || String(data.password).length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      hasError = true;
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
    } else {
      setSuccess(true);
    }

    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below to reset your account password.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
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
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              required
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-sm font-medium text-destructive">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          {success && (
            <div className="text-sm font-medium text-green-600">
              Password has been successfully reset!
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-4">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && <Spinner className="mr-2" />}
            Reset Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
