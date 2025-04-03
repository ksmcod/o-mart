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
import { ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";

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
      imageFiles: [],
    },
  });

  const values = useWatch({ control: form.control });

  // console.log("VALUES: ", values);

  const [subCategoryOption, setSubCategoryOption] =
    useState<SelectOptionType | null>(null);

  const [images, setImages] = useState<File[]>([]);

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

  // Function to add an image
  function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    const selectedImages = Array.from(e.target.files || []);
    const imageFilesArray: File[] = Array.from(images);

    selectedImages.forEach((image) => {
      if (!validImageTypes.includes(image.type)) {
        // TODO: Proper Error Message For Invalid Types

        e.target.value = "";

        return;
      }

      imageFilesArray.push(image);
      setImages(imageFilesArray);

      const dataTransfer = new DataTransfer();
      imageFilesArray.forEach((image) => dataTransfer.items.add(image));

      const imageFiles = Array.from(dataTransfer.files);
      form.setValue("imageFiles", imageFiles as [File, ...File[]]);
    });
  }

  // Function to delete a selected image
  function deleteSelectedImage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageFile: File
  ) {
    e.preventDefault();

    const imageFilesArray: File[] = Array.from(images);
    const filteredImageFilesArray: File[] = imageFilesArray.filter(
      (image) => image !== imageFile
    );

    const dataTransfer = new DataTransfer();
    filteredImageFilesArray.forEach((image) => dataTransfer.items.add(image));

    setImages(filteredImageFilesArray);
    const imageFiles = Array.from(dataTransfer.files);

    form.setValue("imageFiles", imageFiles as [File, ...File[]]);
  }

  return (
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    <div className="mt-8 space-y-6 pb-10">
      <h1 className="text-2xl text-center font-bold">Post a new product</h1>

      <Form {...form}>
        <form
          className="space-y-8 max-w-3xl mx-auto"
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

            {/* PRODUCT PHOTOS */}
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="imageFiles"
                render={({ fieldState }) => (
                  <FormItem className="flex flex-col gap-0">
                    <FormLabel
                      className={`flex justify-center items-center gap-3 border-2 bg-gray-100 rounded-lg cursor-pointer p-1 ${
                        fieldState.invalid && "border-main"
                      }`}
                    >
                      <ImagePlus size={30} strokeWidth={1.5} />
                      <span className="text-base">Add photos</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => addImage(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Display Selected Images */}
              <div className="grid grid-cols-2 sm:flex justify-center items-center flex-wrap gap-1">
                {images.map((image, index) => (
                  <div key={index} className="relative group border shadow-md">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      width={200}
                      height={200}
                      className="aspect-square object-cover"
                    />

                    <button
                      className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 text-white"
                      onClick={(e) => deleteSelectedImage(e, image)}
                    >
                      <Trash2 size={35} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button className="bg-main hover:bg-main_hover text-white font-bold text-base w-full p-4">
            Publish
          </Button>
        </form>
      </Form>
    </div>
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /* eslint-enable @typescript-eslint/no-unused-vars */
  );
}
