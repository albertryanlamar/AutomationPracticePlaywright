import { test as base } from "./pageFixtures";
import { readJsonTestdata, getTc } from "../helpers/commonFunctions";

const authDataGet = readJsonTestdata('authenticationtestcases.json', 'tcData');

export const test = base.extend<{ authData: any }>({
  authData: async ({}, use, testInfo) => {
    const tc = getTc(testInfo.title, authDataGet['AuthTestCases']);
    await use(tc?.testdata);
  }
});
export { expect } from "@playwright/test";