export const GET_ALBUMS_QUERY = `
query GetAlbumsWithContent {
  allAlbum(where: { title: { neq: "Home" } }) {
    title
    description
    _id
  }
  allAlbumContent(where: { album: { title: { neq: "Home" } } }) {
    album {
      _id
    }
    content {
      asset {
        _id
        url
        metadata {
          dimensions {
            width
            height
          }
        }
      }
    }
  }
}`;
