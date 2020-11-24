export interface Teacher {
  id: string;
  name: string;
  tagline: string;
  picture: string;
  quotes: {
    // Key is subject name
    [K: string]: string[];
  };
}
