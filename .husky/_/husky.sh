#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  readonly husky_skip_init=1
  export PATH="$PATH:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
  if [ -f "$0" ]; then
    export readonly husky_script="$0"
  fi
fi