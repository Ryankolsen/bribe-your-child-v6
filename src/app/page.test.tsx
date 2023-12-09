import React from "react";
import { render, screen } from "@testing-library/react";

test("renders", () => {
  render(<div>hello world</div>);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
