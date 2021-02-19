import React, { useEffect, useRef, useState } from "react";
import { Publication } from "../lib/Publication.interface";
import API from "../lib/xkcd";
import Comic from "../components/comic";
import { reactionsIcons } from "../lib/reactions";
import "./app.scss";

export const App = () => {
  const observe = useRef(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isIntersecting, setIntersecting] = useState(false);
  const [modal, setModal] = useState({
    index: 0,
    view: false,
  });

  const loadData = async (isIntersecting: boolean) => {
    useEffect(() => {
      API.getAllAPI(6).then(({ error, body }) =>{
        if (!error) {
          setPublications([...publications, ...body]);
        }
      });
    }, [isIntersecting]);
  };

  const useOnScreen = (ref:any, rootMargin = "0px") => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entry) => {
          setIntersecting(entry[0].isIntersecting);
        },
        {
          threshold: [0.2],
          rootMargin,
        }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.unobserve(ref.current);
      };
    }, []);
    loadData(isIntersecting);

    return isIntersecting;
  };

  useOnScreen(observe, "-60px");

  const assignReaction = (reaction: string, indexPublication: number) => {
    publications[indexPublication].reaction = {
      name: reaction,
      // @ts-ignore
      icon: reactionsIcons[reaction],
    };
    setPublications([...publications]);
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
            />
          </div>
        </section>
      )}
      <div
        ref={observe}
        style={{
          height: "300px",
        }}
      />
    </main>
  );
};

export default App;
