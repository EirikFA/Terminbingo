import { FunctionComponent, h } from "preact";

import { TeacherList } from "../components";
import { Teacher } from "../types";

const teachers: Teacher[] = [
  {
    id: "1",
    name: "John-Nitter Gundersen",
    tagline: "Kræsj bom bang",
    picture: "https://via.placeholder.com/64x64.png",
    subjects: ["Geografi", "Geofag 1", "Geofag 2", "Matematikk R2"]
  },
  {
    id: "2",
    name: "Olav Skutlaberg",
    tagline: "Glup idé",
    picture: "https://via.placeholder.com/64x64.png",
    subjects: ["Matematikk 1T", "Matematikk R1", "Matematikk R2"]
  },
  {
    id: "3",
    name: "John-Willy Syvertsen",
    tagline: "All krig er basert",
    picture: "https://cdn.discordapp.com/avatars/324619866487390218/08ce9ce5a3f9827d74ad4cdeed413ac7.png?size=64",
    subjects: ["Historie", "Norsk"]
  }
];

const Home: FunctionComponent = () => (
  <div className="container">
    <h1 className="title">Terminbingo</h1>
    <h2 className="subtitle">Velg en lærer for å spille</h2>
    <div className="columns">
      <TeacherList teachers={teachers} />
    </div>
  </div>
);

export default Home;
