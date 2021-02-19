import React from "react";
import { shallow } from "enzyme";
import Comic from "./index";
import { publicationMock } from "../../lib/mocksAPI";
describe("Component Comic's card ", () => {
  const map = {};
  window.addEventListener = jest.fn((event, callback) => {
    //@ts-ignore
    map[event] = callback;
  });
  const comic = shallow(<Comic publication={publicationMock} />);

  describe("Info Component", () => {
    test("Title", () => {
      expect(comic.find(".Comic__title").text()).toEqual("mRNA Vaccine");
    });
    test("date format", () => {
      expect(comic.find(".Comic__date").text()).toEqual("15 de Febrero 2021");
    });
    test("ref", () => {
      expect(comic.find(".Comic__ref").text()).toEqual("ref: 2425");
    });
    test("img (src and alt)", () => {
      expect(comic.find(".Comic__img-src").prop("src")).toEqual(
        "https://imgs.xkcd.com/comics/mrna_vaccine.png"
      );
      expect(comic.find(".Comic__img-src").prop("alt")).toEqual(
        "To ensure lasting immunity, doctors recommend destroying a second Death Star some time after the first."
      );
    });
    test("text", () => {
      expect(comic.find(".Comic__text").text()).toEqual(
        "To ensure lasting immunity, doctors recommend destroying a second Death Star some time after the first."
      );
    });
    test(" actions icon defaul", () => {
      expect(comic.find(".reactionOff__icon").text()).toEqual("thumb_up_alt");
      expect(comic.find(".reactionOff__text").text()).toEqual("Me gusta");
    });
  });
});
