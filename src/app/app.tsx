import React, { useEffect, useState } from "react";
import { Publication } from "../lib/Publication.interface";
import API from "../lib/xkcd";
import Comic from "../components/comic";
import "./app.scss";

export const App = () => {
  const [publication, setPublication] = useState<Publication[]>([]);
  const [ref, setRef] = useState<number>(15)

  useEffect(async () => {
    const _body:Publication[] = []
    const {error, body} = await API.getAllAPI(10);
    if(!error){
      setPublication(body);
    }
    console.log(body)
  }, []);

  return (
    <section className='app'>
      {
        publication.map((item) =><Comic key={item.num} publication={item} /> )
      }
    </section>
  );
};

export default App;
