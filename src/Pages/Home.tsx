import { FunctionComponent, h, JSX } from "preact";
import { useState } from "preact/hooks";
import { useLocation } from "wouter";
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
  }
];

const schools: School[] = [
  {
    id: "1",
    name: "Arendal videregående skole",
    teachers
  }
];

const HomePage: FunctionComponent = () => {
  const [, setLocation] = useLocation();
  const [school, setSchool] = useState<School | null>(null);

  const handleSchoolInput: JSX.GenericEventHandler<HTMLSelectElement> = e => {
    const selected = schools.find(s => s.id === (e.target as HTMLSelectElement).value);
    setSchool(selected ?? null);
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
        <div className="columns teacher-list">
          <TeacherList teachers={school.teachers} onClick={handleTeacherClick} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
