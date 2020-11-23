export class Subject {
  public static Geo1: Subject = new Subject("Geofag 1");

  public static Geo2: Subject = new Subject("Geofag 2");

  public static Geog: Subject = new Subject("Geografi");

  public static Hist: Subject = new Subject("Historie");

  public static Math1T: Subject = new Subject("Matematikk 1T");

  public static MathR1: Subject = new Subject("Matematikk R1");

  public static MathR2: Subject = new Subject("Matematikk R2");

  public static Norw: Subject = new Subject("Norsk");

  private constructor (public readonly name: string) {}

  public toString (): string {
    return this.name;
  }
}

export interface Teacher {
  id: string;
  name: string;
  tagline: string;
  picture: string;
  phrases: string[];
  subjects: {
    [K in Exclude<keyof typeof Subject, "prototype">]?: string[];
  };
}
