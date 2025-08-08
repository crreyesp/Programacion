#!/bin/bash

set -e

echo "🚀 Deploying SIGECOL services..."

cd /opt/sigecol

echo "📥 Pulling latest changes..."
git pull origin devin/1754626550-vps-setup

echo "📁 Creating directories..."
mkdir -p backend frontend nginx/ssl logs

echo "🐳 Building and starting Docker services..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 30

echo "🔍 Checking service status..."
docker-compose ps

echo "🗄️ Testing database connection..."
docker-compose exec -T postgres psql -U sigecol_user -d sigecol -c "SELECT version();"

PUBLIC_IP=$(curl -s ifconfig.me)

echo ""
echo "✅ SIGECOL deployment completed!"
echo ""
echo "🌐 Access URLs:"
echo "Frontend: http://$PUBLIC_IP:3000"
echo "Backend API: http://$PUBLIC_IP:8000"
echo "API Docs: http://$PUBLIC_IP:8000/docs"
echo ""
echo "📊 Service Status:"
docker-compose ps
echo ""
echo "📝 Logs:"
echo "View logs: docker-compose logs -f [service_name]"
echo "Available services: postgres, backend, frontend, nginx"
