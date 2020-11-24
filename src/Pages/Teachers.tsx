import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";
import { RouteComponentProps, useLocation } from "wouter-preact";
import "@fortawesome/fontawesome-free/css/all.css";

import "./Teachers.scss";

import { SchoolPicker, TeacherList } from "../components";
import { School, Teacher } from "../types";

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "John Nitter Gundersen",
    tagline: "Kræsj bom bang",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: {
      general: ["Kræsj bom bang", "Sorry"],
      Geografi: ["Lorem", "Ipsum"],
      "Geofag 1": ["Jalla geo1"],
      "Geofag 2": ["Geo2"],
      "Matematikk R2": ["MathR2", "mong"]
    }
  },
  {
    id: "2",
    name: "Olav Skutlaberg",
    tagline: "Glup idé",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: {
      general: ["Glup idé"],
      "Matematikk 1T": [],
      "Matematikk R1": [],
      "Matematikk R2": []
    }
  },
  {
    id: "3",
    name: "John Willy Syvertsen",
    tagline: "All krig er basert",
    picture: "https://cdn.discordapp.com/avatars/324619866487390218/08ce9ce5a3f9827d74ad4cdeed413ac7.png?size=64",
    phrases: {
      general: ["All krig er basert"],
      Historie: [],
      Norsk: []
    }
  },
  {
    id: "4",
    name: "Olav Mørland",
    tagline: "Selvstudium i IT-timene i dag",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: {
      general: ["Selvstudium i IT-timene i dag"],
      "Informasjonsteknologi 1": [],
      "Informasjonsteknologi 2": [],
      "Matematikk 1T": []
    }
  }
];

export const schools: School[] = [
  {
    id: "1",
    name: "Arendal videregående skole",
    teachers
  }
];

// Does not work with interface - https://github.com/microsoft/TypeScript/issues/15300
type TeachersPageParams = {
  schoolId: string;
};

export type TeachersPageProps = RouteComponentProps<TeachersPageParams>;

const TeachersPage: FunctionComponent<TeachersPageProps> = ({ params: { schoolId } }) => {
  const [, setLocation] = useLocation();
  const [school, setSchool] = useState<School | null>(null);

  const findAndSetSchool = (id: string): School | undefined => {
    const selected = schools.find(s => s.id === id);
    if (selected) {
      setSchool(selected);
    }

    return selected;
  };

  // Yes, `TeachersPageParams.schoolId` is not optional, but it will be `undefined` when there is no parameter
  // Wouter's `DefaultParams` (`RouteComponentProps`) does not permit any other value types than strings (do not ask why)
  if (schoolId?.trim() !== "") findAndSetSchool(schoolId);
  // For history to work/re-render picker when user goes back to root (the route is the same)
  if (!schoolId || schoolId.trim() === "") setSchool(null);

  const handleSchoolInput: JSX.GenericEventHandler<HTMLSelectElement> = e => {
    const selected = findAndSetSchool((e.target as HTMLSelectElement).value);
    if (selected) setLocation(`/${selected.id}`);
  };

  const handleTeacherClick = (id: string): void => {
    if (school) {
      setLocation(`/${school.id}/${id}`);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Terminbingo</h1>
      <h2 className="subtitle">
        Velg en&nbsp;
        {school ? "lærer" : "skole"}
        &nbsp;for å spille
      </h2>
      {!school && <SchoolPicker onInput={handleSchoolInput} schools={schools} />}

      {school && (
        <div className="columns is-multiline teacher-list">
          <TeacherList teachers={school.teachers} onClick={handleTeacherClick} />
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
