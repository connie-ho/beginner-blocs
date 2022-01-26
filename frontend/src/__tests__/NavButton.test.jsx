import React from "react";
import { render, cleanup } from "@testing-library/react";
import NavButton from "../components/common/NavButton"
import { expect } from "chai";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<NavButton/>);
});

it("renders a login button", () => {
  const {getByText} = render(<NavButton>Login</NavButton>)
  expect(getByText("Login")).toBeInDocument();
});

