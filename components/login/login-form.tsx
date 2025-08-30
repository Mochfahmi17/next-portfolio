"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Button } from "../ui/button";
import z from "zod";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { apiBaseUrl } from "@/lib/api";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);

        router.push("/");
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Type your email address..."
                    disabled={isPending}
                    {...field}
                    className="focus-visible:ring-2 focus-visible:ring-slate-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type your password..."
                      disabled={isPending}
                      {...field}
                      className="focus-visible:ring-2 focus-visible:ring-slate-700"
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className={clsx(
                        "hover:text-darkBlue absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-600",
                        {
                          "text-darkBlue": showPassword,
                        },
                      )}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="bg-darkBlue hover:bg-darkBlue/90 w-full cursor-pointer"
        >
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
