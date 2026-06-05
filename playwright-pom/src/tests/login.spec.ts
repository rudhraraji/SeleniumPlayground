import { test, expect } from '../fixtures/baseTest';
import credentials from '../test-data/users.json';


test('Login with valid credentials', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  await loginPage.open();

  await loginPage.login(
    credentials[0].username,
    credentials[0].password
  );

  await dashboardPage.waitForDashboard();
  await dashboardPage.validateHomeHeading();
  await dashboardPage.validateUserIdentity();

});

test('Login with Invalid credentials: Both email and password are incorrect', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  await loginPage.open();

  await loginPage.login(
    credentials[1].username,
    credentials[1].password
  );

  await loginPage.verifyEmailErrorMessage();

});

test('Login with Invalid credentials: Invalid email address error messages before password field is visible', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  await loginPage.open();

  await loginPage.enterUsername(credentials[2].username);
  await loginPage.clickDisabledContinue();

  await loginPage.verifyInvalidEmailErrorMessageBeforePassword();

});


test('Login with Invalid credentials: Empty email and password error messages', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  await loginPage.open();
  await loginPage.enterUsername(credentials[0].username);
  await loginPage.passwordInput.waitFor({ state: 'visible' });
  await loginPage.enterPassword(credentials[0].password);
  await loginPage.usernameInput.clear();
  await loginPage.passwordInput.clear();

  await loginPage.verifyEmptyEmailErrorMessage();
  await loginPage.verifyEmptyPasswordErrorMessage();

});


test('Login with Invalid credentials: Email address without @ and . error message', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  await loginPage.open();
  await loginPage.enterUsername(credentials[0].username);
  await loginPage.passwordInput.waitFor({ state: 'visible' });
  await loginPage.enterPassword(credentials[0].password);
  await loginPage.usernameInput.clear();
  await loginPage.passwordInput.clear();

  await loginPage.enterUsername(credentials[2].username);


  await loginPage.verifyInvalidEmailErrorMessage();

});


test('Login with Invalid credentials: Password length should be at least 8 characters error message', async ({
  page,
  loginPage,
  dashboardPage
}) => {
  await loginPage.open();
  await loginPage.enterUsername(credentials[0].username);
  await loginPage.passwordInput.waitFor({ state: 'visible' });
  await loginPage.enterPassword(credentials[0].password);
  await loginPage.usernameInput.clear();
  await loginPage.passwordInput.clear();

  await loginPage.enterUsername(credentials[2].username);
  await loginPage.enterPassword(credentials[2].password);
  await loginPage.verifyPasswordLengthErrorMessage();

});
