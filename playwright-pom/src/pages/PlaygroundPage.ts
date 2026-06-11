import { expect, Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class PlaygroundPage extends BasePage {
  readonly url = 'https://www.testmuai.com/selenium-playground/';

  readonly page: Page;
  readonly canonicalLink: Locator;

  // // Column#1
   readonly heading: Locator;
  // readonly AjaxFormSubmit: Locator;
  // readonly BootstrapListBox: Locator;
  // readonly CheckboxDemo: Locator;
  // readonly DragAndDropSlider: Locator;
  // readonly GeolocationTesting: Locator;
  // readonly JavascriptAlerts: Locator;
  // readonly JQuerySelectDropdown: Locator;
  // readonly ProgressBarModal: Locator;
  // readonly ShadowDOM: Locator;
  // readonly TableDataSearch: Locator;
  // readonly uploadFileDemo: Locator;

  // // Column#2
  // readonly Autohealing: Locator;
  // readonly BootstrapModals: Locator;
  // readonly ContextMenu: Locator;
  // readonly DragAndDrop: Locator;
  // readonly HoverDemo: Locator;
  // readonly JQueryDatePicker: Locator;
  // readonly KeyPress: Locator;
  // readonly RadioButtonsDemo: Locator;
  // readonly SimpleFormDemo: Locator;
  // readonly TableFilter: Locator;
  // readonly VirtualDOM: Locator;

  // // Column#3
  // readonly BootstrapAlerts: Locator;
  // readonly BootstrapProgressBar: Locator;
  // readonly DataListFilter: Locator;
  // readonly DynamicDataLoading: Locator;
  // readonly iFrameDemo: Locator;
  // readonly JQuesryDownloadProgram: Locator;
  // readonly NestedFrames: Locator;
  // readonly Redirection: Locator;
  // readonly StatusCodes: Locator;
  // readonly TablePagination: Locator;
  // readonly WindowPopupModal: Locator;

  // // Column#4 
  // readonly BootstrapDatepicker: Locator;
  // readonly BrokenImage: Locator;
  // readonly DownloadFileDemo: Locator;
  // readonly FileDownload: Locator;
  // readonly InputFormSubmit: Locator;
  // readonly JQueryListBox: Locator;
  // readonly OverlappedElement: Locator;
  // readonly SelectDropdownList: Locator;
  // readonly TableDataDownload: Locator;
  // readonly TableSortAndSearch: Locator;


  constructor(page: Page) {
    super(page);
    this.page = page;
    this.canonicalLink = page.locator('link[rel="canonical"]');
    this.heading = this.page.getByRole('heading', { name: 'Selenium Playground' });
    // this.AjaxFormSubmit = this.page.getByRole('link', { name: 'Ajax Form Submit' });
    // this.BootstrapListBox = this.page.getByRole('link', { name: 'Bootstrap List Box' });
    // this.CheckboxDemo = this.page.getByRole('link', { name: 'Checkbox Demo' });
    // this.DragAndDropSlider = this.page.getByRole('link', { name: 'Drag & Drop Sliders' });
    // this.GeolocationTesting = this.page.getByRole('link', { name: 'Geolocation Testing' });
    // this.JavascriptAlerts = this.page.getByRole('link', { name: 'Javascript Alerts' });
    // this.JQuerySelectDropdown = this.page.getByRole('link', { name: 'JQuery Select dropdown' });
    // this.ProgressBarModal = this.page.getByRole('link', { name: 'Progress Bar Modal' });
    // this.ShadowDOM = this.page.getByRole('link', { name: 'Shadow DOM' });
    // this.TableDataSearch = this.page.getByRole('link', { name: 'Table Data Search' });
    // this.uploadFileDemo = this.page.getByRole('link', { name: 'Upload File Demo' });

    // this.Autohealing = this.page.getByRole('link', { name: 'Auto Healing' });
    // this.BootstrapModals = this.page.getByRole('link', { name: 'Bootstrap Modals' });
    // this.ContextMenu = this.page.getByRole('link', { name: 'Context Menu' });
    // this.DragAndDrop = this.page.getByRole('link', { name: 'Drag and Drop' });
    // this.HoverDemo = this.page.getByRole('link', { name: 'Hover Demo' });
    // this.JQueryDatePicker = this.page.getByRole('link', { name: 'JQuery Date Picker' });
    // this.KeyPress = this.page.getByRole('link', { name: 'Key Press' });
    // this.RadioButtonsDemo = this.page.getByRole('link', { name: 'Radio Buttons Demo' });
    // this.SimpleFormDemo = this.page.getByRole('link', { name: 'Simple Form Demo' });
    // this.TableFilter = this.page.getByRole('link', { name: 'Table Filter' });
    // this.VirtualDOM = this.page.getByRole('link', { name: 'Virtual DOM' });

    // this.BootstrapAlerts = this.page.getByRole('link', { name: 'Bootstrap Alerts' });
    // this.BootstrapProgressBar = this.page.getByRole('link', { name: 'Bootstrap Progress Bar' });
    // this.DataListFilter = this.page.getByRole('link', { name: 'Data List Filter' });
    // this.DynamicDataLoading = this.page.getByRole('link', { name: 'Dynamic Data Loading' });
    // this.iFrameDemo = this.page.getByRole('link', { name: 'iFrame Demo' });
    // this.JQuesryDownloadProgram = this.page.getByRole('link', { name: 'JQuery Download Progress bars' })
    // this.NestedFrames = this.page.getByRole('link', { name: 'Nested Frames' });
    // this.Redirection = this.page.getByRole('link', { name: 'Redirection' });
    // this.StatusCodes = this.page.getByRole('link', { name: 'Status Codes' });
    // this.TablePagination = this.page.getByRole('link', { name: 'Table Pagination' });
    // this.WindowPopupModal = this.page.getByRole('link', { name: 'Window Popup Modal' });

    // this.BootstrapDatepicker = this.page.getByRole('link', { name: 'Bootstrap Date Picker' });
    // this.BrokenImage = this.page.getByRole('link', { name: 'Broken Images' });
    // this.DownloadFileDemo = this.page.getByRole('link', { name: 'Download File Demo' });
    // this.FileDownload = this.page.getByRole('link', { name: 'File Download' });
    // this.InputFormSubmit = this.page.getByRole('link', { name: 'Input Form Submit' });
    // this.JQueryListBox = this.page.getByRole('link', { name: 'JQuery List Box' });
    // this.OverlappedElement = this.page.getByRole('link', { name: 'Overlapped Element' });
    // this.SelectDropdownList = this.page.getByRole('link', { name: 'Select Dropdown List' });
    // this.TableDataDownload = this.page.getByRole('link', { name: 'Table Data Download' });
    // this.TableSortAndSearch = this.page.getByRole('link', { name: 'Table Sort & Search' });
  }

  async open() {
    await this.navigateTo(this.url);
  }

  async validatePageURL(expectedPageURL: string) {
    const href = await this.canonicalLink.getAttribute('href');
    if (!href) throw new Error('Canonical link href attribute not found');
    expect(href.startsWith(this.url)).toBe(true);
    const actualPageURL = href.replace(this.url, '').replace(/\/$/, '');
    expect(actualPageURL).toBe(expectedPageURL);
  }

  async validateHeading() {
    await expect(this.heading).toContainText('Selenium Playground');
  }

  // Dynamically targets a specific dashboard link element and clicks it
  async clickLinkByName(linkName: string): Promise<void> {
    const dynamicLocator = this.page.getByRole('link', { name: linkName, exact: true });
    await dynamicLocator.scrollIntoViewIfNeeded();
    await dynamicLocator.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Validate that the target page address matches our expected end subpath
  async validatePageURLs(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath + '$'));
  }

  async getTitle() {
    return this.page.title();
  }

  async close() {
    await this.page.close();
  }
}