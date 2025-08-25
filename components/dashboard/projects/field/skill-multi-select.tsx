"use client";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { useState, useRef } from "react";
import useSWR from "swr";
import { X } from "lucide-react";
import { SkillsResponse } from "@/types";
import { apiBaseUrl } from "@/lib/api";
import { fetcher } from "@/lib/swr/fetcher";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "@/components/ui/badge";

type SkillMultiSelectProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: {
    [K in Path<TFieldValues>]: PathValue<TFieldValues, K> extends string[]
      ? K
      : never;
  }[Path<TFieldValues>];
  pending: boolean;
};

const SkillMultiSelect = <TFieldValues extends FieldValues>({
  form,
  name,
  pending,
}: SkillMultiSelectProps<TFieldValues>) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const { data: response } = useSWR<SkillsResponse>(
    `${apiBaseUrl}/skills`,
    fetcher,
  );

  const skills = response ? response.data : [];

  const selectedIds: string[] = form.watch(name) || [];
  const selectedSkills = skills.filter((s) => selectedIds.includes(s.id)) || [];

  const unselectedSkills =
    skills.filter((s) => !selectedIds.includes(s.id)) || [];

  const handleUnselect = (id: string) => {
    form.setValue(
      name,
      selectedIds.filter((sid) => sid !== id) as PathValue<
        TFieldValues,
        typeof name
      >,
    );
  };

  const handleSelect = (id: string) => {
    form.setValue(name, [...selectedIds, id] as PathValue<
      TFieldValues,
      typeof name
    >);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) return;

    if ((e.key === "Backspace" || e.key === "Delete") && input.value === "") {
      form.setValue(
        name,
        selectedIds.slice(0, -1) as PathValue<TFieldValues, typeof name>,
      );
    }

    if (e.key === "Escape") {
      input.blur();
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="dark:text-white">Skills</FormLabel>
          <FormControl>
            <Command
              onKeyDown={handleKeyDown}
              className="overflow-visible bg-transparent"
            >
              {/* Input Area with Badges */}
              <div className="group border-input ring-offset-background dark:bg-darkBlue rounded-md border px-1 py-2 text-sm shadow-xs focus-within:ring-2 focus-visible:ring-slate-700">
                <div className="flex flex-wrap gap-1">
                  {selectedSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="dark:text-darkBlue dark:bg-white"
                    >
                      {skill.name}
                      <button
                        className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={() => handleUnselect(skill.id)}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <X className="text-muted-foreground hover:text-foreground h-3 w-3 cursor-pointer dark:hover:text-slate-500" />
                      </button>
                    </Badge>
                  ))}

                  <CommandPrimitive.Input
                    ref={inputRef}
                    value={inputValue}
                    disabled={pending}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    placeholder="Select skills..."
                    className="placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Dropdown Option List */}
              <div className="relative mt-2">
                <CommandList>
                  {open && unselectedSkills.length > 0 && (
                    <div className="bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-none">
                      <CommandGroup className="max-h-60 overflow-auto">
                        {unselectedSkills.map((skill) => (
                          <CommandItem
                            key={skill.id}
                            onSelect={() => handleSelect(skill.id)}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="cursor-pointer"
                          >
                            {skill.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </div>
                  )}
                </CommandList>
              </div>
            </Command>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SkillMultiSelect;
