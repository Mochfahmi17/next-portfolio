import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type ResumeInputProps<TFieldValue extends FieldValues> = {
  form: UseFormReturn<TFieldValue>;
  name: Path<TFieldValue>;
  pending: boolean;
  oldPreview?: string;
};

const ResumeInput = <TFieldValue extends FieldValues>({
  form,
  name,
  pending,
  oldPreview,
}: ResumeInputProps<TFieldValue>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [deleteOldPreview, setDeleteOldPreview] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const deleteFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    form.resetField(name);
    setDeleteOldPreview(true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const displayPreview = preview || (!deleteOldPreview && oldPreview);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Resume</FormLabel>
          {displayPreview ? (
            <div className="relative">
              <Button
                type="button"
                variant="outline"
                asChild
                className="flex items-center gap-2"
              >
                <Link href={displayPreview} target="_blank">
                  <Eye className="h-4 w-4" />
                  Preview CV
                </Link>
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={deleteFile}
                className="absolute top-0 right-0 cursor-pointer"
              >
                <X />
              </Button>
            </div>
          ) : (
            <>
              <FormControl>
                <Input
                  type="file"
                  accept="application/pdf"
                  ref={inputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);

                    if (file) {
                      if (preview) {
                        URL.revokeObjectURL(preview);
                      }

                      const fileUrl = URL.createObjectURL(file);
                      setPreview(fileUrl);
                    }
                  }}
                  disabled={pending}
                  className="dark:bg-darkBlue focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white"
                />
              </FormControl>
              <FormMessage />
            </>
          )}
        </FormItem>
      )}
    />
  );
};

export default ResumeInput;
