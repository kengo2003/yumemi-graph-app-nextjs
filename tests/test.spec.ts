import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://yumemi-graph-app-nextjs.vercel.app/");
  await page
    .getByRole("button", { name: "北海道" })
    .getByRole("checkbox")
    .check();
  await page.locator(".highcharts-markers > path:nth-child(4)").click();
  await page
    .getByRole("button", { name: "年少人口" })
    .getByRole("radio")
    .check();
  await page
    .getByRole("button", { name: "宮崎県" })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("button", { name: "生産年齢人口" })
    .getByRole("radio")
    .check();
  await page
    .getByRole("button", { name: "石川県" })
    .getByRole("checkbox")
    .check();
  await page.getByRole("button", { name: "和歌山県" }).click();
  await page
    .getByRole("button", { name: "和歌山県" })
    .getByRole("checkbox")
    .check();
  await page
    .getByRole("button", { name: "和歌山県" })
    .getByRole("checkbox")
    .uncheck();
  await page
    .getByRole("button", { name: "石川県" })
    .getByRole("checkbox")
    .uncheck();
  await page.getByRole("button", { name: "総人口" }).getByRole("radio").check();
});
