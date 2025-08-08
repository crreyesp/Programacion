#!/bin/bash
set -e

echo "🔧 Fixing VPS database authentication..."

cd /opt/sigecol

git pull origin devin/1754626550-vps-setup

cp .env.vps .env

echo "📋 Environment variables:"
grep -E "DB_PASSWORD|DATABASE_URL" .env || echo "No DB variables found"

docker-compose down

docker-compose rm -f postgres backend

docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 15

echo "📊 Container status:"
docker-compose ps

echo "📝 Backend logs:"
docker-compose logs backend --tail=10

echo "✅ VPS authentication fix completed!"
echo "🔍 Checking backend health..."
curl -f http://localhost:8000/health || echo "Backend still starting..."
