"use client";

import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function RegisterForm() {
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
  return (
    <div className="mt-8 space-y-6">
      <h1 className="text-2xl text-center font-bold">Register on O'Mart</h1>

      <Form {...form}>
        <form className="space-y-8 max-w-2xl mx-auto">
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
          </div>

          <div className="space-y-2">
            {/* Submit button */}
            <Button
              className="bg-red-500 hover:bg-red-600 transition-colors py-5 font-bold text-base text-white w-full"
              type="submit"
            >
              Register
            </Button>

            <div className="text-xs mt-40">
              Already have an account?{" "}
              <Link
                href={"/login"}
                className="hover:underline hover:text-red-500"
              >
                Log in
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
