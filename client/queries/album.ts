export const GET_ALBUMS_QUERY = `
query GetAlbumsWithContent {
    allAlbum {
        title
        description
        _id
    }
    allAlbumContent {
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
