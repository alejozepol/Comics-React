import React, { useEffect, useState } from "react";
import { Publication } from "../lib/Publication.interface";
import API from "../lib/xkcd";
import Comic from "../components/comic";
import {reactionsIcons} from '../lib/reactions';
import "./app.scss";


export const App = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [ref, setRef] = useState<number>(15);

  useEffect(async () => {
    const _body: Publication[] = [];
    const { error, body } = await API.getAllAPI(10);
    if (!error) {
      setPublications(body);
    }
    console.log(body);
  }, []);

  const assignReaction = (reaction: string, indexPublication:number) => {
    publications[indexPublication].reaction={
      name:reaction,
      icon: reactionsIcons[reaction]
    }
    setPublications([...publications])
    console.log(publications[indexPublication]);
  };

  return (
    <section className="app">
      <div className="app__title">
        <h2>xkcd</h2>
        <p>A webcomic of romance,sarcasm, math, and language.</p>
      </div>
      <section className="app__content">
        {publications.map((item, i) => (
          <Comic
            key={item.num}
            indexPublication={i}
            publication={item}
            assignReaction={assignReaction}
          />
        ))}
      </section>
    </section>
  );
};

export default App;
