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
import { LevelsResponse } from "@/types";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import useSWR from "swr";

type LevelSelectProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
};

const LevelSelect = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
}: LevelSelectProps<TFieldValues>) => {
  const {
    data: response,
    isLoading,
    error,
  } = useSWR<LevelsResponse>(`${apiBaseUrl}/levels`, fetcher);

  const levels = response?.data ?? [];
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">Level Skill</FormLabel>
          <Select
            disabled={pending}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl className="dark:bg-darkBlue dark:hover:bg-darkBlue/90 w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white">
              <SelectTrigger>
                <SelectValue placeholder="Select level skill" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {isLoading && <p className="px-2">Loading...</p>}
              {error && <p className="px-2 text-red-500">Failed to load</p>}
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  {level.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LevelSelect;
