"use client";

import { Loader2, FilePlus, FilePen, FileSearch, Trash2, FolderInput } from "lucide-react";

interface StrReplaceArgs {
  command: "view" | "create" | "str_replace" | "insert" | "undo_edit";
  path: string;
  [key: string]: unknown;
}

interface FileManagerArgs {
  command: "rename" | "delete";
  path: string;
  new_path?: string;
}

interface ToolInvocation {
  toolName: string;
  state: string;
  result?: unknown;
  args?: unknown;
}

function getLabel(tool: ToolInvocation): { icon: React.ReactNode; text: string } {
  const args = tool.args as Record<string, unknown> | undefined;
  const filename = (args?.path as string | undefined)?.split("/").pop() ?? "";

  if (tool.toolName === "str_replace_editor") {
    const { command } = (args ?? {}) as StrReplaceArgs;
    switch (command) {
      case "create":
        return { icon: <FilePlus className="w-3 h-3" />, text: `Creating ${filename}` };
      case "str_replace":
      case "insert":
        return { icon: <FilePen className="w-3 h-3" />, text: `Editing ${filename}` };
      case "view":
        return { icon: <FileSearch className="w-3 h-3" />, text: `Reading ${filename}` };
      default:
        return { icon: <FilePen className="w-3 h-3" />, text: `Updating ${filename}` };
    }
  }

  if (tool.toolName === "file_manager") {
    const { command, new_path } = (args ?? {}) as FileManagerArgs;
    const destName = new_path?.split("/").pop() ?? "";
    switch (command) {
      case "delete":
        return { icon: <Trash2 className="w-3 h-3" />, text: `Deleting ${filename}` };
      case "rename":
        return { icon: <FolderInput className="w-3 h-3" />, text: `Renaming ${filename} → ${destName}` };
    }
  }

  return { icon: <FilePen className="w-3 h-3" />, text: tool.toolName };
}

interface ToolCallBadgeProps {
  tool: ToolInvocation;
}

export function ToolCallBadge({ tool }: ToolCallBadgeProps) {
  const done = tool.state === "result" && tool.result != null;
  const { icon, text } = getLabel(tool);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {done ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600 shrink-0" />
      )}
      <span className="text-neutral-600">{icon}</span>
      <span className="text-neutral-700">{text}</span>
    </div>
  );
}
