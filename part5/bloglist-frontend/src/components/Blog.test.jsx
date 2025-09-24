import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "testurl.com",
    likes: 10,
    user: { id: "test123", name: "test" },
  };

  test("Blogs render with title and author only and not likes or url by default", () => {
    render(<Blog blog={blog} />);
    expect(screen.getByText("Test Title")).toBeDefined();
    expect(screen.getByText("Test Author")).toBeDefined();
    expect(screen.queryByText("testurl.com")).toBeNull();
    expect(screen.queryByText("10")).toBeNull();
  });

  test("shows blog URL and likes when the view button is clicked", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} toggleView={mockHandler} />);

    screen.debug();
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.queryByText("testurl.com")).toBeDefined();
    expect(screen.queryByText("10")).toBeDefined();
    expect(mockHandler.mock.calls).toHaveLength(1);
  });

  test("if like button is clicked twice, event handler is called twice", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} handleLike={mockHandler} view={true} />);

    screen.debug();
    const user = userEvent.setup();

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
