"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import buttonSchema from "@/schema/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Socialmedia } from "@/types/socialMedia";
import SocialIcon from "../ui/social-icon";

interface Props {
  devaultValues: z.infer<typeof buttonSchema>;
  updateContent: (values: z.infer<typeof buttonSchema>) => void;
}

export default function ButtonForm({ devaultValues, updateContent }: Props) {
  const form = useForm<z.infer<typeof buttonSchema>>({
    resolver: zodResolver(buttonSchema),
    defaultValues: devaultValues,
  });

  function onSubmit(values: z.infer<typeof buttonSchema>) {
    updateContent(values);
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                <span>Link</span>
                <div className="flex gap-1.5 leading-none">
                  <label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Open in new tab
                  </label>
                  <Checkbox
                    id="terms1"
                    checked={form.watch("openNewTab")}
                    onClick={() => form.setValue("openNewTab", !form.getValues("openNewTab"))}
                  />
                </div>
              </FormLabel>
              <FormControl>
                <Input placeholder="https://google.com" {...field} />
              </FormControl>
              <FormDescription>The Redirect URL</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ICON */}
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <div className="flex  justify-end gap-1.5">
                    <FormLabel>Icon</FormLabel>
                    <Checkbox checked={form.watch("showIcon")} onClick={() => form.setValue("showIcon", !form.getValues("showIcon"))} />
                  </div>

                  {form.watch("showIcon") && (
                    <Select value={form.watch("icon")} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Icons</SelectLabel>
                          {Object.keys(Socialmedia).map((icon) => (
                            <SelectItem key={icon} value={icon.toLowerCase()}>
                              <div className="flex items-center ">
                                <SocialIcon value={icon.toLowerCase()} size={20} />
                                <span className="ml-4 text-xl">{icon}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
