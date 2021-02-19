import React, { useEffect, useState } from "react";
import { Publication } from "../lib/Publication.interface";
import API from "../lib/xkcd";
import Comic from "../components/comic";
import { reactionsIcons } from "../lib/reactions";
import "./app.scss";

export const App = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [modal, setModal] = useState({
    index: 0,
    view: false,
  });

  useEffect(async () => {
    const { error, body } = await API.getAllAPI(2);
    if (!error) {
      setPublications(body);
    }
    console.log(body);
  }, []);

  const assignReaction = (reaction: string, indexPublication: number) => {
    publications[indexPublication].reaction = {
      name: reaction,
      icon: reactionsIcons[reaction],
    };
    setPublications([...publications]);
    console.log(publications[indexPublication]);
  };

  const viewModal = () =>
    modal.view
      ? setModal({ ...modal, view: false })
      : setModal({ ...modal, view: true });

  return (
    <main className="app">
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
            setModal={setModal}
          />
        ))}
      </section>
      {modal.view && (
        <section className="modal">
          <div className="modal__back" onClick={viewModal}></div>
          <div className="modal__front">
          <Comic
            indexPublication={modal.index}
            publication={publications[modal.index]}
            assignReaction={assignReaction}
            setModal={setModal}
            full={true}
          /></div>
        </section>
      )}
    </main>
  );
};

export default App;
