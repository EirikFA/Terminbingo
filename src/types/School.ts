import { Teacher } from ".";

export interface School {
  id: string;
  name: string;
  teachers: Teacher[];
}
