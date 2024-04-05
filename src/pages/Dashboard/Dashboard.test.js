import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("renders edit instructions", () => {
  render(<Dashboard />);
  screen.getByText(/Notice Dashboard/i);
});
