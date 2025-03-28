"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import registerAction from "@/actions/register";
import { RegisterSchema } from "@/schemas/auth-schemas";
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
import Social from "./social";

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");

  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSucces("");

    startTransition(() => {
      registerAction(values)
        .then((data) => {
          setSucces(data.success);
          setError(data.error);
        })
        .catch((err) => {
          setError("An error occured!");
        });
    });
  };

  return (
    <div className="mt-8 space-y-6 pb-6">
      <h1 className="text-2xl text-center font-bold">Register on O'Mart</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl mx-auto"
        >
          {/* Input Fields */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 *:flex-1">
              {/* First name field */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bowser" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last name field */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Dragon" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="bowser112" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              disabled={isLoading}
            >
              Register
            </Button>

            <div className="text-xs mt-40 flex gap-1">
              <span>Already have an account?</span>
              <Link href={"/login"} className="hover:underline hover:text-main">
                Log in
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
