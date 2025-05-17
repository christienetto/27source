#!/bin/sh
curl -L http://localhost:8080/api-docs -o ../api-docs.json
pnpm dlx openapi-typescript ../api-docs.json  -o schema.ts
