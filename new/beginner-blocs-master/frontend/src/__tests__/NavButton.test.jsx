import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import NavButton from "../components/common/NavButton"

afterEach(cleanup);


it("renders without crashing", () => {
  render(<NavButton/>);
});

it("renders a login button", () => {
  render(<NavButton>Login</NavButton>);
  expect(screen.getByText("Login")).toBeInTheDocument();
});

it("renders a logout button", () => {
  render(<NavButton>Logout</NavButton>);
  expect(screen.getByText("Logout")).toBeInTheDocument();
})

it("renders a clickable button", () => {
  const handleClick = jest.fn();
  const { getByText } = render(
    <NavButton onClick={handleClick}>Clickable</NavButton>
  );

  const button = getByText("Clickable");

  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});