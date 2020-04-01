// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

import { sendAsync } from "./dispatch_json.ts";

interface DocRequest {
  rootName: string;
}

export function doc(request: DocRequest): Promise<any> {
  return sendAsync("op_doc", request);
}
