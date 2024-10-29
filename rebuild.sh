#!/bin/bash
docker compose build backend
docker compose build frontend
docker-compose up -d