import {defineField, defineType} from 'sanity'

export const albumContentType = defineType({
  name: 'albumContent',
  title: 'Album Content',
  type: 'document',
  fields: [
    defineField({
      name: 'album',
      type: 'reference',
      to: [{type: 'album'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'image'}],
      validation: (rule) =>
        rule.custom(async (content, context) => {
          if (!content) return true

          const albumRef = context.document?.album as any
          if (!albumRef?._ref) return true

          const album = await context
            .getClient({apiVersion: '2024-01-01'})
            .fetch(`*[_type == "album" && _id == $id][0]{title}`, {
              id: albumRef._ref,
            })

          if (album?.title == 'Home' && content.length > 6) {
            return {message: `Maximum of 6 images allowed for this album`, level: 'error'}
          }

          return true
        }),
    }),
  ],
  preview:{
    select: {
      albumTitle: 'album.title',
    },
    prepare({albumTitle}: {albumTitle: string}) {
      return {
        title: albumTitle || 'Untitled album',
      }
    },
  }
})