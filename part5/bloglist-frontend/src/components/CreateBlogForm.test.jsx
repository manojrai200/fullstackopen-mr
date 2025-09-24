import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlogForm createBlog={createBlog} setMessage={null} setStatus={null} />);

  const sendButton = screen.getByText("create");

    await user.type(screen.getByLabelText(/title/i), "Blog Testing");
    await user.type(screen.getByLabelText(/author/i), "Tester");
    await user.type(screen.getByLabelText(/url/i), "testing.com");

    const submitButton = screen.getByRole("button", { name: /create/i });


  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Blog Testing')
  expect(createBlog.mock.calls[0][0].author).toBe('Tester')
  expect(createBlog.mock.calls[0][0].url).toBe('testing.com')

});
