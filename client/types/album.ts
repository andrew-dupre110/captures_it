export interface AlbumContent {
  _id: string;
  url: string;
  metadata: {
    dimensions: {
      height: number;
      width: number;
    };
  };
}

export interface Album {
  _id: string;
  title: string;
  description: string;
  content: AlbumContent[];
}
