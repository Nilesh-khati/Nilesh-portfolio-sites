@echo off
REM MongoDB Setup Script for Windows
REM This script helps create .env.local file

echo.
echo 🚀 MongoDB Setup for Portfolio
echo ================================
echo.

REM Check if .env.local already exists
if exist .env.local (
    echo ⚠️  .env.local file already exists!
    set /p overwrite="Do you want to overwrite it? (y/n): "
    if /i not "%overwrite%"=="y" (
        echo ❌ Setup cancelled.
        exit /b 1
    )
)

REM Get MongoDB URI
echo Enter MongoDB URI:
echo   Default (local): mongodb://localhost:27017/
set /p mongodb_uri="MongoDB URI [mongodb://localhost:27017/]: "
if "%mongodb_uri%"=="" set mongodb_uri=mongodb://localhost:27017/

REM Get Admin Username
set /p admin_username="Admin Username [admin]: "
if "%admin_username%"=="" set admin_username=admin

REM Get Admin Password
set /p admin_password="Admin Password [admin123]: "
if "%admin_password%"=="" set admin_password=admin123

REM Generate random secret (simple version for Windows)
set nextauth_secret=change-this-secret-in-production-%RANDOM%-%RANDOM%

REM Create .env.local file
(
echo # MongoDB Configuration
echo MONGODB_URI=%mongodb_uri%
echo.
echo # Admin Authentication
echo ADMIN_USERNAME=%admin_username%
echo ADMIN_PASSWORD=%admin_password%
echo.
echo # NextAuth Configuration
echo NEXTAUTH_SECRET=%nextauth_secret%
echo NEXTAUTH_URL=http://localhost:3000
echo.
echo # Database Name (optional - defaults to "portfolio")
echo # DB_NAME=portfolio
) > .env.local

echo.
echo ✅ .env.local file created successfully!
echo.
echo 📝 Next steps:
echo   1. Make sure MongoDB is running
echo   2. Run: npm run dev
echo   3. Visit: http://localhost:3000
echo.
pause


