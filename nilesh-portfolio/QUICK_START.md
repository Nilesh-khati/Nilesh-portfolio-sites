# Quick Start Guide - MongoDB Setup

## 🚀 Fast Setup (3 Steps)

### Step 1: Create `.env.local` File

Project root में `.env.local` file manually बनाएं:

```env
MONGODB_URI=mongodb://localhost:27017/
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

**या automated setup script use करें:**

**Windows:**
```bash
setup-env.bat
```

**Linux/Mac:**
```bash
chmod +x setup-env.sh
./setup-env.sh
```

### Step 2: Start MongoDB

**Windows:**
```bash
# MongoDB service start करें
net start MongoDB
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

### Step 3: Start Development Server

```bash
npm run dev
```

Browser में जाएं: `http://localhost:3000`

## ✅ Verify Setup

1. **MongoDB Connection Check:**
   - Console में कोई MongoDB error नहीं दिखना चाहिए
   - `[MongoDB] Connected to default localhost instance` message दिखना चाहिए

2. **Test API Endpoints:**
   - `http://localhost:3000/api/projects` - Empty array `[]` return होना चाहिए
   - `http://localhost:3000/api/contact` - Empty array `[]` return होना चाहिए

3. **Admin Dashboard:**
   - `http://localhost:3000/admin/login`
   - Username: `admin`
   - Password: `admin123`

## 📁 Database Structure

MongoDB automatically create करेगा:

**Database:** `portfolio`

**Collections:**
- `projects` - Portfolio projects (CRUD operations)
- `contacts` - Contact form messages

## 🔧 Troubleshooting

### MongoDB Connection Error?

1. **Check MongoDB Service:**
   ```bash
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl status mongod
   ```

2. **Check Port 27017:**
   ```bash
   # Windows
   netstat -an | findstr 27017
   
   # Linux/Mac
   lsof -i :27017
   ```

3. **Verify .env.local:**
   - File exists है?
   - `MONGODB_URI=mongodb://localhost:27017/` correctly set है?

### Still Not Working?

1. MongoDB manually install करें: https://www.mongodb.com/try/download/community
2. MongoDB service restart करें
3. Development server restart करें
4. Check `MONGODB_SETUP.md` for detailed instructions

## 📚 More Information

- Detailed setup: `MONGODB_SETUP.md`
- API documentation: Check `app/api/` folder
- Backend routes: Already implemented and ready to use!

## 🎉 You're All Set!

अब आप:
- ✅ Projects add/edit/delete कर सकते हैं (Admin Dashboard से)
- ✅ Contact messages receive कर सकते हैं
- ✅ Full CRUD operations use कर सकते हैं
- ✅ Database में data store हो रहा है

Happy Coding! 🚀


