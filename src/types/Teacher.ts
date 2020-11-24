export interface Teacher {
  id: string;
  name: string;
  tagline: string;
  picture: string;
  phrases: {
    // Key is subject name
    [K: string]: string[];
  };
}
