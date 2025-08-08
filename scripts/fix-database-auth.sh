#!/bin/bash
set -e

echo "🔧 Fixing PostgreSQL authentication with complete reset..."

cd /opt/sigecol

git pull origin devin/1754626550-vps-setup

cp .env.vps .env

echo "📋 Current environment variables:"
grep -E "DB_PASSWORD|DATABASE_URL" .env

echo "🛑 Stopping all containers..."
docker-compose down

echo "🗑️ Removing PostgreSQL data volume..."
docker volume rm sigecol_postgres_data || true

echo "🔄 Removing PostgreSQL container..."
docker-compose rm -f postgres || true

echo "🚀 Starting PostgreSQL with fresh initialization..."
docker-compose up -d postgres

echo "⏳ Waiting for PostgreSQL initialization..."
sleep 20

echo "📝 PostgreSQL initialization logs:"
docker-compose logs postgres --tail=10

echo "🚀 Starting remaining services..."
docker-compose up -d

echo "⏳ Waiting for backend to connect..."
sleep 15

echo "📝 Backend connection logs:"
docker-compose logs backend --tail=15

echo "🔍 Testing backend health..."
curl -f http://37.27.198.175:8000/health || echo "Backend still starting..."

echo "✅ Database authentication fix completed!"
