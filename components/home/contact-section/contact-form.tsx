"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiBaseUrl } from "@/lib/api";
import { contactSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoMdSend } from "react-icons/io";
import { toast } from "sonner";
import z from "zod";

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/contact`, {
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
        form.reset();
      } catch (error) {
        console.error(error);
        toast.error("Terjadi kesalahan!");
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type your name..."
                    disabled={isPending}
                    {...field}
                    className="focus-visible:border-darkBlue focus-visible:ring-darkBlue focus-visible:ring-2 dark:focus-visible:border-white dark:focus-visible:ring-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Type your email..."
                    disabled={isPending}
                    {...field}
                    className="focus-visible:border-darkBlue focus-visible:ring-darkBlue focus-visible:ring-2 dark:focus-visible:border-white dark:focus-visible:ring-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message..."
                    disabled={isPending}
                    {...field}
                    className="focus-visible:border-darkBlue focus-visible:ring-darkBlue h-32 focus-visible:ring-2 dark:focus-visible:border-white dark:focus-visible:ring-white"
                  ></Textarea>
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
          className="bg-darkBlue hover:bg-darkBlue/90 w-full cursor-pointer dark:bg-white"
        >
          {isPending ? (
            "Sending message..."
          ) : (
            <span className="flex items-center gap-1">
              Send <IoMdSend />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
