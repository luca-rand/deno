// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { sendSync } from "./dispatch_json.ts";
import { errors } from "../errors.ts";

export function loadavg(): number[] {
  return sendSync("op_loadavg");
}

export function hostname(): string {
  return sendSync("op_hostname");
}

export function osRelease(): string {
  return sendSync("op_os_release");
}

export function exit(code = 0): never {
  sendSync("op_exit", { code });
  throw new Error("Code not reachable");
}

export function envSet(key: string, value: string): void {
  sendSync("op_env_set", { key, value });
}

export function envGet(key: string): string | undefined {
  return sendSync("op_env_get", { key })[0];
}

export function env(): { [index: string]: string } {
  return sendSync("op_env");
}

type DirKind =
  | "home"
  | "cache"
  | "config"
  | "executable"
  | "data"
  | "data_local"
  | "audio"
  | "desktop"
  | "document"
  | "download"
  | "font"
  | "picture"
  | "public"
  | "template"
  | "tmp"
  | "video";

export function dir(kind: DirKind): string | null {
  try {
    return sendSync("op_get_dir", { kind });
  } catch (error) {
    if (error instanceof errors.PermissionDenied) {
      throw error;
    }
    return null;
  }
}

export function execPath(): string {
  return sendSync("op_exec_path");
}
