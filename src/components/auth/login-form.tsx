"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas/auth-schemas";
import loginAction from "@/actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSuccess from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import Social from "@/components/auth/social";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");

  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSucces("");

    startTransition(() => {
      loginAction(values)
        .then((data) => {
          setSucces(data.success);
          setError(data.error);
        })
        .catch((err) => {
          console.log("Error: ", err);
          setError("An error occured!");
        });
    });
  };

  return (
    <div className="mt-8 space-y-6">
      <h1 className="text-2xl text-center font-bold">
        Sign in to your O&apos;Mart account
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl mx-auto"
        >
          {/* Input Fields */}
          <div className="space-y-3">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="bowser.dragon@smashbros.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Form Status */}
            {/* TODO: Form success/error message */}
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>

          <div className="space-y-2">
            {/* Submit button */}
            <Button
              className="bg-main hover:bg-main_hover transition-colors py-5 font-bold text-base text-white w-full"
              type="submit"
              disabled={isLoading || !!success}
            >
              Sign in
            </Button>

            <div className="text-xs mt-40 flex gap-1">
              <span>Don&apos;t have an account?</span>
              <Link
                href={"/register"}
                className="hover:underline hover:text-main_hover"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </Form>

      <div className="max-w-2xl mx-auto">
        <Social />
      </div>
    </div>
  );
}
