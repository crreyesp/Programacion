#!/bin/bash

set -e

echo "🚀 Starting SIGECOL VPS Setup..."

echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

echo "🔧 Installing essential packages..."
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

echo "🐳 Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

echo "🔗 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "👤 Adding user to docker group..."
sudo usermod -aG docker $USER

echo "🔥 Configuring UFW firewall..."
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp  # Next.js frontend
sudo ufw allow 8000/tcp  # FastAPI backend

echo "🕐 Setting timezone to America/Santiago..."
sudo timedatectl set-timezone America/Santiago

echo "📁 Creating project directory..."
mkdir -p /opt/sigecol
sudo chown $USER:$USER /opt/sigecol

echo "📥 Cloning SIGECOL repository..."
cd /opt/sigecol
git clone https://github.com/crreyesp/Programacion.git .
git checkout devin/1754626550-vps-setup

echo "⚙️ Creating environment configuration..."
cp .env.example .env

DB_PASSWORD=$(openssl rand -base64 32)
SECRET_KEY=$(openssl rand -base64 64)
JWT_SECRET=$(openssl rand -base64 32)

sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASSWORD/" .env
sed -i "s/SECRET_KEY=.*/SECRET_KEY=$SECRET_KEY/" .env
sed -i "s/JWT_SECRET_KEY=.*/JWT_SECRET_KEY=$JWT_SECRET/" .env
sed -i "s/ENVIRONMENT=.*/ENVIRONMENT=production/" .env

echo "✅ VPS setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Logout and login again to apply docker group changes"
echo "2. Run: cd /opt/sigecol && docker-compose up -d"
echo "3. Access SIGECOL at: http://$(curl -s ifconfig.me):3000"
echo ""
echo "🔐 Generated passwords saved in /opt/sigecol/.env"
