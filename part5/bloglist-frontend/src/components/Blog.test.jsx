import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("Blogs render with title and author only and not likes or url by default", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "testurl.com",
    likes: 10,
  };

  render(<Blog blog={blog} />);
    screen.debug();
  expect(screen.getByText("Test Title")).toBeDefined();
  expect(screen.getByText("Test Author")).toBeDefined();
  expect(screen.queryByText("testurl.com")).toBeNull();
  expect(screen.queryByText("10 likes")).toBeNull();
});

// test("shows URL and likes when view button is clicked", async () => {
//   const blog = {
//     title: "Test Title",
//     author: "Test Author",
//     url: "testurl.com",
//     likes: 10,
//   };

//   const mockHandler = vi.fn();
//   render(<Blog blog={blog} toggleView={mockHandler} />);

//   screen.debug()
//   const user = userEvent.setup();
//   const button = screen.getByText("view");
//   await user.click(button);
//   expect(screen.queryByText("testurl.com")).toBeDefined();
//   expect(screen.queryByText("10 likes")).toBeDefined();
//   expect(mockHandler.mock.calls).toHaveLength(1)
// });
