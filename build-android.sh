#!/usr/bin/env bash

pnpm i

echo $NDK_HOME
pnpm tauri android build --apk --split-per-abi --target aarch64
