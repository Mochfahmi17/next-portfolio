"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";

type CertificateImageInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  pending: boolean;
  oldPreview?: string;
};

const CertificateImageInput = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
  oldPreview,
}: CertificateImageInputProps<TFieldValues>) => {
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
          <FormLabel className="dark:text-white">Certificate image</FormLabel>
          <div className="relative flex aspect-video h-[350px] w-full flex-col overflow-hidden rounded-lg">
            {displayPreview ? (
              <>
                <Image
                  src={displayPreview}
                  alt="Preview Certificate Image"
                  fill
                  className="object-contain"
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
              <FormLabel className="dark:bg-darkBlue relative flex aspect-video h-[350px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 text-slate-600">
                <IoCloudUpload className="size-20 dark:text-white" />
                <h4 className="mb-2 text-lg font-bold dark:text-white">
                  Upload your Certificate Image
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
        </FormItem>
      )}
    />
  );
};

export default CertificateImageInput;
