import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolCallBadge } from "../ToolCallBadge";

function makeTool(overrides: object) {
  return { toolName: "str_replace_editor", state: "call", result: undefined, args: {}, ...overrides };
}

// str_replace_editor

test("shows 'Creating' for str_replace_editor create command", () => {
  render(<ToolCallBadge tool={makeTool({ args: { command: "create", path: "src/Card.tsx" } })} />);
  expect(screen.getByText("Creating Card.tsx")).toBeDefined();
});

test("shows 'Editing' for str_replace_editor str_replace command", () => {
  render(<ToolCallBadge tool={makeTool({ args: { command: "str_replace", path: "src/App.tsx" } })} />);
  expect(screen.getByText("Editing App.tsx")).toBeDefined();
});

test("shows 'Editing' for str_replace_editor insert command", () => {
  render(<ToolCallBadge tool={makeTool({ args: { command: "insert", path: "src/index.ts" } })} />);
  expect(screen.getByText("Editing index.ts")).toBeDefined();
});

test("shows 'Reading' for str_replace_editor view command", () => {
  render(<ToolCallBadge tool={makeTool({ args: { command: "view", path: "src/utils.ts" } })} />);
  expect(screen.getByText("Reading utils.ts")).toBeDefined();
});

// file_manager

test("shows 'Deleting' for file_manager delete command", () => {
  render(<ToolCallBadge tool={makeTool({ toolName: "file_manager", args: { command: "delete", path: "src/Old.tsx" } })} />);
  expect(screen.getByText("Deleting Old.tsx")).toBeDefined();
});

test("shows 'Renaming' for file_manager rename command", () => {
  render(<ToolCallBadge tool={makeTool({ toolName: "file_manager", args: { command: "rename", path: "src/Old.tsx", new_path: "src/New.tsx" } })} />);
  expect(screen.getByText("Renaming Old.tsx → New.tsx")).toBeDefined();
});

// state indicators

test("shows spinner when state is 'call'", () => {
  const { container } = render(<ToolCallBadge tool={makeTool({ state: "call", args: { command: "create", path: "a.tsx" } })} />);
  expect(container.querySelector(".animate-spin")).toBeDefined();
});

test("shows green dot when state is 'result'", () => {
  const { container } = render(
    <ToolCallBadge tool={makeTool({ state: "result", result: "ok", args: { command: "create", path: "a.tsx" } })} />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
});
