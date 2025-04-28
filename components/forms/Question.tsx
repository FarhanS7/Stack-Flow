"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createQuestion } from "@/lib/actions/question.action";
import { QuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
// import { Props } from "next/script";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const type: any = "create";

interface Props {
  mongoUserId: string;
}

export default function Question({ mongoUserId }: Props) {
  const editorRef = useRef<any>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const { setValue, trigger, clearErrors } = form;

  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    try {
      //make api call to create question

      await createQuestion({
        title: values.title,
        content: values.description,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });
      // navigate to home

      router.push("/");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      const tags = field.value as string[];

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "manual",
            message: "Tag must be less than 15 characters long",
          });
        }

        if (tags.includes(tagValue)) return;
        if (tags.length >= 3) {
          return form.setError("tags", {
            type: "manual",
            message: "You can only add up to 3 tags",
          });
        }

        setValue("tags", [...tags, tagValue]);
        tagInput.value = "";
        clearErrors("tags");
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-200">
                Question Title<span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="min-h-[56px] bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Be specific and imagine you’re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-200">
                Detailed Explanation of your question
                <span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    initialValue=""
                    onBlur={field.onBlur}
                    onEditorChange={(content) => {
                      setValue("description", content);
                      trigger("description");
                    }}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "help",
                      ],
                      toolbar:
                        "undo redo | blocks | codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                      content_style:
                        "body { font-family:Inter,Arial,sans-serif; font-size:16px }",
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Include all the information someone would need to answer your
                question.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 w-full">
              <FormLabel className="text-base font-semibold text-gray-700 dark:text-gray-200">
                Tags<span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className="min-h-[56px] bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap mt-2 gap-2">
                      {field.value.map((tag: string) => (
                        <span
                          key={tag}
                          className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleTagRemove(tag, field)}
                            className="focus:outline-none"
                          >
                            <Image
                              src="/assets/icons/close.svg"
                              width={12}
                              height={12}
                              alt="Remove tag"
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Add up to 3 tags to describe what your question is about.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-yellow-400 w-fit text-white cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
