#!/usr/bin/env bash

pnpm i
pnpm build
tar -I 'zstd -20 -T0' -caf build.tar.xz dist/
