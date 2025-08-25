"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type DescriptionInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
};

const DescriptionInput = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
}: DescriptionInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">Description</FormLabel>
          <FormControl>
            <Textarea
              disabled={pending}
              placeholder="Description"
              {...field}
              className="dark:bg-darkBlue h-28 focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white"
            ></Textarea>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionInput;
