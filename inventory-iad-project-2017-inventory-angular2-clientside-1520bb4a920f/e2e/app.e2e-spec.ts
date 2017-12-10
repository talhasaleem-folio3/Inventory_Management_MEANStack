import { InventoryAngular2ClientSidePage } from './app.po';

describe('inventory-angular2-client-side App', () => {
  let page: InventoryAngular2ClientSidePage;

  beforeEach(() => {
    page = new InventoryAngular2ClientSidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
