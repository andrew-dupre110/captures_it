import { defineField, defineType } from "sanity";

export const albumType = defineType({
    name: 'album',
    title: 'Album',
    type: "document",
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'description',
            type: 'string',
        })
    ]
})