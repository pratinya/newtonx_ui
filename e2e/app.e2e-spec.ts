import { MydemoPage } from './app.po';

describe('mydemo App', () => {
  let page: MydemoPage;

  beforeEach(() => {
    page = new MydemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
