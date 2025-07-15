import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("adds a task when Enter key is pressed", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Write something...");
  await userEvent.type(input, "Learn testing{enter}");

  const newTask = screen.getByText("Learn testing");
  expect(newTask).toBeInTheDocument();
});

test("deletes a task when Delete button is clicked", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Write something...");
  await userEvent.type(input, "Delete me{enter}");

  const deleteButton = screen.getByText("Delete");
  await userEvent.click(deleteButton);

  expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
});

test("edits a task when edit button is clicked and text is edited", async () => {
  render(<App/>);

  const input = screen.getByPlaceholderText("Write something...");
  await userEvent.type(input,"Edit me{enter}");

  const editButton = screen.getByText("Edit");
  await userEvent.click(editButton)

  const editInput = screen.getByDisplayValue("Edit me");
  await userEvent.clear(editInput);
  await userEvent.type(editInput, "Edited me")

  const saveButton = screen.getByText("Save");
  await userEvent.click(saveButton);

  const editedTask = screen.getByText("Edited me");
  expect(editedTask).toBeInTheDocument();
})

test("does not add a task when input is empty or spaces", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Write something...");
  await userEvent.type(input, "   {enter}");

  const task = screen.queryByText("   ");
  expect(task).not.toBeInTheDocument();
});

test("removes the task when edited text is blank and saved", async () => {
  render(<App />);

  const input = screen.getByPlaceholderText("Write something...");
  await userEvent.type(input, "Edit me{enter}");

  const editButton = screen.getByText("Edit");
  await userEvent.click(editButton);

  const editInput = screen.getByDisplayValue("Edit me");
  await userEvent.clear(editInput);

  const saveButton = screen.getByText("Save");
  await userEvent.click(saveButton);

  expect(screen.queryByText("Edit me")).not.toBeInTheDocument();
});
