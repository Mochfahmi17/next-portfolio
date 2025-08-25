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
import React, { useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";

type IconImageInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
  oldPreview?: string;
};

const IconImageInput = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
  oldPreview,
}: IconImageInputProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [deleteOldPreview, setDeleteOldPreview] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
          <FormLabel className="dark:text-white">Icon image</FormLabel>
          <div className="relative flex aspect-square h-60 w-60 flex-col overflow-hidden rounded-lg">
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
              <FormLabel className="dark:bg-darkBlue relative flex aspect-square h-60 w-60 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-200 text-slate-600">
                <IoCloudUpload className="size-20 dark:text-white" />
                <h4 className="mb-2 text-lg font-bold dark:text-white">
                  Upload Icon Image
                </h4>
                <p className="text-[10px] font-normal dark:text-slate-300">
                  JPG, JPEG, PNG, SVG, Webp (max: 2MB)
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

                  const imageURL = URL.createObjectURL(file);
                  setPreview(imageURL);
                }
              }}
              className="hidden focus-visible:ring-2 focus-visible:ring-slate-700"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IconImageInput;
