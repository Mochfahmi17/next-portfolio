import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type LinkDemoInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
};

const LinkDemoInput = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
}: LinkDemoInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">Link demo</FormLabel>
          <FormControl>
            <Input
              disabled={pending}
              placeholder="Type your link demo..."
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

export default LinkDemoInput;
