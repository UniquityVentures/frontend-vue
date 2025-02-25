#!/usr/bin/env bash

npm i
npm run build
tar -I 'zstd -20 -T0' -caf build.tar.xz dist/
