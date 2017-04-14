import { FirebaseAppPage } from './app.po';

describe('firebase-app App', () => {
  let page: FirebaseAppPage;

  beforeEach(() => {
    page = new FirebaseAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
