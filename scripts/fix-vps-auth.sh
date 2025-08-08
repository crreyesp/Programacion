#!/bin/bash
set -e

echo "🔧 Fixing VPS database authentication..."

cd /opt/sigecol

git pull origin devin/1754626550-vps-setup

cp .env.vps .env

docker-compose down

docker-compose rm -f postgres backend

docker-compose up -d

sleep 10

echo "✅ VPS authentication fix completed!"
echo "🔍 Checking backend health..."
curl -f http://localhost:8000/health || echo "Backend still starting..."
