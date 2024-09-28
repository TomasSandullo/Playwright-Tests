import { test, expect } from '@playwright/test';

const email = process.env.email;
const password = process.env.password;

test('Create, Clone and Delete a Role', async ({ page }) => {
test.setTimeout(120000);
let hasFailures = false;
  await page.goto('https://app.int.devo.com/login');
//Send email keys.
  await page.getByLabel('Email').fill(email);
//Send password
  await page.getByLabel('Password').fill(password);
//Log in
  await page.getByRole('button', { name: 'Log in' }).click();
//Create new role  
  await page.getByLabel('Administration').click();
  await page.getByLabel('Roles').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Create role' }).click();
  //Assign name to new role
  await page.getByPlaceholder('Role name').click();
  await page.getByPlaceholder('Role name').fill('Test Role');
  //Asign description to new role
  await page.getByPlaceholder('Description for the new Role').click();
  await page.getByPlaceholder('Description for the new Role').fill('Description for test role');
  //Assign permissions to new role
  await page.locator('div').filter({ hasText: /^Users & Roles$/ }).nth(1).click();
  //Check 'Users & Roles'/Preferences first(view) checkbox
  await page.locator('li:nth-child(4) > .sc-dWSiPC > li:nth-child(2) > .sc-ynJRL > .sc-cArzPw > li > .sc-ktEKTO > .sc-bALXmG > .input-marker').first().click();
  //Check 'Users & Roles'/Users first(view) checkbox
  await page.locator('li:nth-child(3) > .sc-ynJRL > .sc-cArzPw > li > .sc-ktEKTO > .sc-bALXmG > .input-marker').first().click();
  //Check View profile first(view) checkbox
  await page.locator('div').filter({ hasText: /^View profileViewN\/A$/ }).getByRole('listitem').first().click();
  await page.getByRole('button', { name: 'Create' }).click();
//Clone role recently created
  await page.getByTestId('roles-button-clone').click();
  
  await page.waitForTimeout(2000);

//Make sure that the role was succesfully cloned
  
  try {
  //Assert description
  await expect(page.getByTestId('rolesForm').getByRole('paragraph')).toContainText('Description for test role');
  console.log('Description test passed')
  } catch (error) {
    console.error('Description Test FAILED')
  hasFailures = true;
  };
  
  try {
  //Assert Title
  await expect.soft(page.getByTestId('rolesForm').getByRole('heading')).toContainText('Test Role Copy 1');
  console.log('Title test passed');
  } catch (error) {
    console.error('Title test FAILED')
    hasFailures = true;
  }
  
  try {
  //Assert 'Users & Roles'/'Roles' first(View) checkbox to be checked
  await expect.soft(page.locator('li:nth-child(4) > .sc-dWSiPC > li:nth-child(2) > .sc-ynJRL > .sc-cArzPw > li > .sc-ktEKTO > .sc-bALXmG > .input-marker').first()).toBeChecked();
  //Assert 'Users & Roles'/'Roles' second(Manage) checkbox to NOT be checked
  await expect.soft(page.locator('li:nth-child(4) > .sc-dWSiPC > li:nth-child(2) > .sc-ynJRL > .sc-cArzPw > li:nth-child(2) > .sc-ktEKTO > .sc-bALXmG > .input-marker')).not.toBeChecked();
  console.log('Checkboxes test passed'); 
} catch (error) {
  console.error('Checkboxes test for roles FAILED')
  hasFailures = true;
}

  try {
  //Assert 'Users & Roles'/Users first checkbox(View) to be checked
  await expect.soft(page.locator('li:nth-child(3) > .sc-ynJRL > .sc-cArzPw > li > .sc-ktEKTO > .sc-bALXmG > .input-marker').first()).toBeChecked();
  //Assert 'Users & Roles'/Users second checkbox(Manage) to NOT be checked
  await expect.soft(page.locator('li:nth-child(3) > .sc-ynJRL > .sc-cArzPw > li:nth-child(2) > .sc-ktEKTO > .sc-bALXmG > .input-marker')).not.toBeChecked();
  console.log('Checkboxes test for user passed');
} catch (error) {
  console.error('Checkboxes test for Roles FAILED')
  hasFailures = true;
};
  
  try {
  //Assert 'View Profile' first checkbox(View) to be checked
    await expect.soft(page.locator('li:nth-child(4) > .sc-ynJRL > .sc-cArzPw > li > .sc-ktEKTO > .sc-bALXmG > .input-marker')).toBeChecked();
  //Assert 'View Profile' econd checkbox(Manage) to be 'N/A'
  await expect.soft(page.locator('li:nth-child(4) > .sc-ynJRL > .sc-cArzPw > li:nth-child(2) > .sc-qRumB')).toContainText('N/A');
} catch (error) {
  console.error('Checbkboxes test for Users FAILED')
  hasFailures = true;
};

//DELETE TEST DATA
await page.getByTestId('roles-button-delete').click();
await page.locator('xpath=/html/body/div[6]/div[2]/div[4]/div/div/footer/div/button[2]/span').click();
await page.locator('a').filter({ hasText: /^Test Role$/ }).click();
await page.getByTestId('roles-button-delete').click();
await page.locator('xpath=/html/body/div[6]/div[2]/div[4]/div/div/footer/div/button[2]/span').click();

if (hasFailures){
  throw new Error ('One or more assertions are failed, please review.');
}
});