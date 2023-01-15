#!/bin/bash
docker buildx build --platform linux/amd64 -t ginnyvt/drones-server:1.0.0 . --load
docker buildx build --platform linux/arm64 -t ginnyvt/drones-server:1.0.0 . --load
docker buildx build --platform linux/amd64,linux/arm64 -t ginnyvt/drones-server:1.0.0 . --push