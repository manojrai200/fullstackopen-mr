const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5174");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "pass");

      await expect(page.getByText("wrong credentials")).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "test", "tester", "testing.com");
      await expect(page.getByText("test tester")).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await createBlog(page, "test", "tester", "testing.com");

      await page.getByRole("button", { name: "view" }).click();
      await expect(page.getByText("likes 0")).toBeVisible();

      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("user can delete their own blog", async ({ page }) => {
      await createBlog(page, "test", "tester", "testing.com");

      await expect(page.getByText("test tester")).toBeVisible();
      await page.getByRole("button", { name: "view" }).click();

      await page.getByRole("button", { name: "remove" }).click();

      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        expect(dialog.message()).toBe("Remove blog test");
        await dialog.accept();
      });

      await page.getByRole("button", { name: /remove/i }).click();

      await expect(page.getByText("test tester")).not.toBeVisible();
    });

    test("only creator sees delete button", async ({ page, request }) => {
      await page.getByRole("button", { name: "logout" }).click();

      await request.post("http://localhost:3003/api/testing/reset");

      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "User1",
          username: "user1",
          password: "pass1",
        },
      });

      await request.post("http://localhost:3003/api/users", {
        data: {
          name: "User2",
          username: "user2",
          password: "pass2",
        },
      });

      await loginWith(page, "user1", "pass1");
      await createBlog(page, "test1", "tester1", "testing.1");

      await page.getByRole("button", { name: "logout" }).click();

      await loginWith(page, "user2", "pass2");
      await page.getByRole("button", { name: "view" }).click();

      await createBlog(page, "test2", "tester2", "testing.2");

      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });
  });
});
