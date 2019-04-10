import { BcgdvPage } from "./app.po";

describe("bcgdv App", () => {
  let page: BcgdvPage;

  beforeEach(() => {
    page = new BcgdvPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("app works!");
  });
});
