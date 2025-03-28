"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductSchema } from "@/schemas/product-schemas";
import {
  product_categories,
  product_sub_categories,
  SelectOptionType,
} from "@/options";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Select = dynamic(() => import("react-select"), { ssr: false });
// import Select from "react-select";

export default function NewProductForm() {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      category: "",
      sub_category: "",
      description: "",
      price: 0,
    },
  });

  const values = useWatch({ control: form.control });

  // console.log("VALUES: ", values);

  const [subCategoryOption, setSubCategoryOption] =
    useState<SelectOptionType | null>(null);

  function subCategoriesFiller() {
    // Function to dynamically fill-in the dropddown for sub-categories depending on selected category
    const selectedCategory = values.category;
    if (values.category) {
      const sub_categories = product_sub_categories.filter(
        (item) => item.category === selectedCategory
      );
      return sub_categories[0].sub_categories;
    }
  }

  const onSubmit = (formData: z.infer<typeof ProductSchema>) => {
    console.log("Final Values: ", formData);
  };

  return (
    <div className="mt-8 space-y-6 pb-10">
      <h1 className="text-2xl text-center font-bold">Post a new product</h1>

      <Form {...form}>
        <form
          className="space-y-8 max-w-2xl mx-auto"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* INPUT FIELDS */}
          <div className="space-y-4">
            {/* NAME FIELD */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <FormLabel>Product name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="XBOX Series X|S"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CATEGORY & SUB CATEGORY FIELDS */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 *:flex-1">
              {/* PRODUCT CATEGORY FIELD */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        options={product_categories}
                        placeholder={"Select a category"}
                        onChange={(option: any) => {
                          if (option) {
                            form.setValue("category", option.value);
                            form.setValue("sub_category", "");
                            setSubCategoryOption({
                              value: "",
                              label: "Choose a sub category",
                            });
                          } else {
                            form.setValue("category", "");
                            form.setValue("sub_category", "");
                            setSubCategoryOption({
                              value: "",
                              label: "Choose a sub category",
                            });
                          }
                        }}
                        isClearable
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PRODUCT SUB CATEGORY FIELD */}
              <FormField
                control={form.control}
                name="sub_category"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel>Sub category</FormLabel>
                    <FormControl>
                      <Select
                        options={subCategoriesFiller()}
                        placeholder={"Choose a sub category"}
                        onChange={(option: any) => {
                          if (option) {
                            setSubCategoryOption(option);
                            form.setValue("sub_category", option.value);
                          } else {
                            form.setValue("sub_category", "");
                            setSubCategoryOption({
                              value: "",
                              label: "Choose a sub category",
                            });
                          }
                        }}
                        noOptionsMessage={() => "Choose a category first"}
                        value={subCategoryOption}
                        isClearable
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* DESCRIPTION TEXT AREA */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    {/* <Input
                      {...field}
                      placeholder="Describe your product..."
                      type="text"
                    /> */}
                    <Textarea
                      {...field}
                      rows={7}
                      placeholder="Describe your product..."
                      onChange={(e) =>
                        field.onChange(e.target.value && e.target.value.trim())
                      }
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PRICE FIELD */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-0">
                  <FormLabel>Price (USD)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="$9.99"
                      type="number"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : ""
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="bg-main hover:bg-main_hover text-white font-bold text-base w-full">
            Publish
          </Button>
        </form>
      </Form>
    </div>
  );
}
