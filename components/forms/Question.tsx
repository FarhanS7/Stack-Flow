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
import { QuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Question() {
  const editorRef = useRef<any>(null);

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const { setValue, trigger } = form;

  function onSubmit(values: z.infer<typeof QuestionSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-gray-700 dark:text-gray-200">
                Question Title<span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="min-h-[56px] border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Be specific and imagine you’re asking a question to another
                person.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={() => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-gray-700 dark:text-gray-200">
                Detailed Explanation of your question
                <span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    initialValue=""
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
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "codesample",
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
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-2">
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] text-gray-700 dark:text-gray-200">
                Tags<span className="text-orange-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Add tags..."
                  {...field}
                  className="min-h-[56px] border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </FormControl>
              <FormDescription className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Add up to 3 tags to describe what your question is about
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
