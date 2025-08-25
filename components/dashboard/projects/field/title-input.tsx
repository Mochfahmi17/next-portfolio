"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type TitleInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
};

const TitleInput = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
}: TitleInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">Title</FormLabel>
          <FormControl>
            <Input
              disabled={pending}
              placeholder="Type your project title..."
              {...field}
              className="dark:bg-darkBlue focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleInput;
