import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";
import { RouteComponentProps, useLocation } from "wouter-preact";
import "@fortawesome/fontawesome-free/css/all.css";

import "./Home.scss";

import { SchoolPicker, TeacherList } from "../components";
import { School, Subject, Teacher } from "../types";

const teachers: Teacher[] = [
  {
    id: "1",
    name: "John-Nitter Gundersen",
    tagline: "Kræsj bom bang",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: ["Kræsj bom bang"],
    subjects: {
      [Subject.Geog.toString()]: [],
      [Subject.Geo1.toString()]: [],
      [Subject.Geo2.toString()]: [],
      [Subject.MathR2.toString()]: []
    }
  },
  {
    id: "2",
    name: "Olav Skutlaberg",
    tagline: "Glup idé",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: ["Glup idé"],
    subjects: {
      [Subject.Math1T.toString()]: [],
      [Subject.MathR1.toString()]: [],
      [Subject.MathR2.toString()]: []
    }
  },
  {
    id: "3",
    name: "John-Willy Syvertsen",
    tagline: "All krig er basert",
    picture: "https://cdn.discordapp.com/avatars/324619866487390218/08ce9ce5a3f9827d74ad4cdeed413ac7.png?size=64",
    phrases: ["All krig er basert"],
    subjects: {
      [Subject.Hist.toString()]: [],
      [Subject.Norw.toString()]: []
    }
  },
  {
    id: "4",
    name: "Olav Mørland",
    tagline: "Selvstudium i IT-timene i dag",
    picture: "https://via.placeholder.com/64x64.png",
    phrases: ["Selvstudium i IT-timene i dag"],
    subjects: {
      [Subject.IT1.toString()]: [],
      [Subject.IT2.toString()]: [],
      [Subject.Math1T.toString()]: []
    }
  }
];

const schools: School[] = [
  {
    id: "1",
    name: "Arendal videregående skole",
    teachers
  }
];

// Does not work with interface - https://github.com/microsoft/TypeScript/issues/15300
type HomePageParams = {
  schoolId: string;
};

export type HomePageProps = RouteComponentProps<HomePageParams>;

const HomePage: FunctionComponent<HomePageProps> = ({ params: { schoolId } }) => {
  const [, setLocation] = useLocation();
  const [school, setSchool] = useState<School | null>(null);

  const findAndSetSchool = (id: string): School | undefined => {
    const selected = schools.find(s => s.id === id);
    if (selected) {
      setSchool(selected);
    }

    return selected;
  };

  // Yes, `HomePageParams.schoolId` is not optional, but it will be `undefined` when there is no parameter
  // Wouter's `DefaultParams` (`RouteComponentProps`) does not permit any other value types than strings (do not ask why)
  if (schoolId?.trim() !== "") findAndSetSchool(schoolId);

  const handleSchoolInput: JSX.GenericEventHandler<HTMLSelectElement> = e => {
    const selected = findAndSetSchool((e.target as HTMLSelectElement).value);
    if (selected) setLocation(`/${selected.id}`);
  };

  const handleTeacherClick = (id: string): void => {
    if (school) {
      setLocation(`/game/${school.id}/${id}`);
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

export default HomePage;
