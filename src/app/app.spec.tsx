import React from "react";
import { shallow } from "enzyme";
import App from "./app";
describe("Component App", () => {
  test("Component render app", () => {
    const app = shallow(<App />);
    expect(app.length).toEqual(1);
  });
  describe("Title", () => {
    test("reder title", () => {
      const title = shallow(<App />);
      expect(title.find(".app__title").length).toEqual(1);
    });
    test("title equal to 'xkcd'", () => {
      const title = shallow(<App />);
      expect(title.find(".app__title-text").text()).toEqual("xkcd");
    });
  });
  describe("Content", () => {
    test("reder content", () => {
      const title = shallow(<App />);
      expect(title.find(".app__content").length).toEqual(1);
    });
  });
});
