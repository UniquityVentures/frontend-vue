#!/usr/bin/env bash

pnpm i

pnpm tauri android build --apk --split-per-abi --target aarch64
