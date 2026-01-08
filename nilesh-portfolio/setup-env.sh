#!/bin/bash

# MongoDB Setup Script
# This script helps create .env.local file

echo "🚀 MongoDB Setup for Portfolio"
echo "================================"
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local file already exists!"
    read -p "Do you want to overwrite it? (y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

# Get MongoDB URI
echo "Enter MongoDB URI:"
echo "  Default (local): mongodb://localhost:27017/"
read -p "MongoDB URI [mongodb://localhost:27017/]: " mongodb_uri
mongodb_uri=${mongodb_uri:-mongodb://localhost:27017/}

# Get Admin Username
read -p "Admin Username [admin]: " admin_username
admin_username=${admin_username:-admin}

# Get Admin Password
read -p "Admin Password [admin123]: " admin_password
admin_password=${admin_password:-admin123}

# Generate random secret for NextAuth
nextauth_secret=$(openssl rand -base64 32 2>/dev/null || echo "change-this-secret-in-production")

# Create .env.local file
cat > .env.local << EOF
# MongoDB Configuration
MONGODB_URI=$mongodb_uri

# Admin Authentication
ADMIN_USERNAME=$admin_username
ADMIN_PASSWORD=$admin_password

# NextAuth Configuration
NEXTAUTH_SECRET=$nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database Name (optional - defaults to "portfolio")
# DB_NAME=portfolio
EOF

echo ""
echo "✅ .env.local file created successfully!"
echo ""
echo "📝 Next steps:"
echo "  1. Make sure MongoDB is running"
echo "  2. Run: npm run dev"
echo "  3. Visit: http://localhost:3000"
echo ""


