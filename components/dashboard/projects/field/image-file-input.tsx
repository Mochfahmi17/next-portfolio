"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";

type ImageFileInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
  oldPreview?: string;
};

const ImageFileInput = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
  oldPreview,
}: ImageFileInputProps<TFieldValues>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [deleteOldPreview, setDeleteOldPreview] = useState<boolean>(false);

  const deleteImage = () => {
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
          <FormLabel className="dark:text-white">
            Upload your file here
          </FormLabel>
          <div className="relative flex aspect-video h-60 w-full min-w-full flex-col overflow-hidden rounded-lg md:h-64">
            {displayPreview ? (
              <>
                <Image
                  src={displayPreview}
                  alt="Preview"
                  fill
                  className="object-cover object-center"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={deleteImage}
                  className="relative w-fit cursor-pointer self-end"
                >
                  Delete
                </Button>
              </>
            ) : (
              <FormLabel className="dark:bg-darkBlue relative flex aspect-video h-60 w-full min-w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-slate-600 md:h-64">
                <IoCloudUpload className="size-24 dark:text-white" />
                <h3 className="mb-2 text-xl font-bold dark:text-white">
                  Upload your Image
                </h3>
                <p className="text-xs font-normal dark:text-slate-300">
                  JPG, JPEG, PNG, Webp (max: 2MB)
                </p>
              </FormLabel>
            )}
          </div>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              ref={inputRef}
              disabled={pending}
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);

                if (file) {
                  if (preview) {
                    URL.revokeObjectURL(preview);
                  }

                  const imageUrl = URL.createObjectURL(file);
                  setPreview(imageUrl);
                }
              }}
              className="hidden"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageFileInput;
