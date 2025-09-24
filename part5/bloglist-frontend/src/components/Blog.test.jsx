import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

// test('renders content', () => {
//   const blog = {
//     content: 'Component testing is done with react-testing-library',
//     important: true
//   }

//   render(<Blog blog={blog} />)

//   const element = screen.getByText('Component testing is done with react-testing-library')
//   expect(element).toBeDefined()
// })

test("Blogs render with title and author only and not likes or url by default", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "testurl.com",
    likes: 10
  };

  render(<Blog blog={blog} />);
  expect(screen.getByText("Test Title")).toBeDefined();
  expect(screen.getByText("Test Author")).toBeDefined();
  expect(screen.queryByText("testurl.com")).toBeNull();
  expect(screen.queryByText("10 likes")).toBeNull();
});
