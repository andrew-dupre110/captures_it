import { defineType, defineField } from "sanity";

export const personalInfoType = defineType({
  name: "personalInfo",
  title: "Personal Information",
  type: "document",
  fields: [
    defineField({
      name: "professionalSummary",
      title: "Professional Summary",
      type: "string",
    }),
    defineField({
      name: "telephone",
      title: "Telephone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [{ type: "experience" }],
    }),
  ],
});
