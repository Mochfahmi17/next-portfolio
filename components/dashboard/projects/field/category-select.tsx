"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiBaseUrl } from "@/lib/api";
import { fetcher } from "@/lib/swr/fetcher";
import { CategoriesResponse } from "@/types";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import useSWR from "swr";

type CategorySelectProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
};

const CategorySelect = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
}: CategorySelectProps<TFieldValues>) => {
  const { data: response, isLoading } = useSWR<CategoriesResponse>(
    `${apiBaseUrl}/categories`,
    fetcher,
  );

  const categories = response ? response.data : [];
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">Category</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={pending}
          >
            <FormControl>
              <SelectTrigger className="dark:bg-darkBlue dark:hover:bg-darkBlue/90 w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.length > 0 && !isLoading ? (
                <>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </>
              ) : (
                <SelectItem value="#" disabled>
                  Not found!
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategorySelect;
