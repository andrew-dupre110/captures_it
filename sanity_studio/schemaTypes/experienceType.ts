import { defineType, defineField } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
  ],
});
