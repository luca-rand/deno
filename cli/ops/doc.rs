// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
use super::dispatch_json::{Deserialize, JsonOp, Value};
use crate::doc;
use crate::op_error::OpError;
use crate::state::State;
use deno_core::*;
use futures::future::FutureExt;

pub fn init(i: &mut Isolate, s: &State) {
  i.register_op("op_doc", s.stateful_json_op(op_doc));
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct DocArgs {
  root_name: String,
}

fn op_doc(
  state: &State,
  args: Value,
  _zero_copy: Option<ZeroCopyBuf>,
) -> Result<JsonOp, OpError> {
  let args: DocArgs = serde_json::from_value(args)?;

  let state_ = state.clone();

  let op = async move {
    let module_specifier =
      ModuleSpecifier::resolve_url_or_path(&args.root_name)?;

    let source_file = state_
      .borrow()
      .global_state
      .file_fetcher
      .fetch_source_file(&module_specifier, None)
      .await?;
    let source_code = String::from_utf8(source_file.source_code).unwrap();

    let doc_parser = doc::DocParser::default();

    let doc_nodes = doc_parser
      .parse(module_specifier.to_string(), source_code)
      .unwrap();

    Ok(serde_json::to_value(doc_nodes).unwrap())
  };

  Ok(JsonOp::Async(op.boxed_local()))
}
