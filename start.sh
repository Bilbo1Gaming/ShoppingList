#!/bin/bash
chown -R bun:bun /usr/src/app
chmod 777 /usr/src/app
su bun -c "bun run src/index.ts"