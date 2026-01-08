# MongoDB Setup Guide

## MongoDB Connection Configuration

### Step 1: Create `.env.local` File

Project root में `.env.local` file बनाएं और निम्नलिखित content add करें:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: MongoDB Installation & Setup

#### Windows पर MongoDB Install करें:

1. **MongoDB Download करें:**
   - https://www.mongodb.com/try/download/community से MongoDB Community Server download करें
   - Windows installer चलाएं

2. **MongoDB Service Start करें:**
   ```bash
   # MongoDB service automatically start हो जाएगी
   # या manually start करने के लिए:
   net start MongoDB
   ```

3. **MongoDB Verify करें:**
   ```bash
   # MongoDB shell में connect करें
   mongosh
   
   # या old version के लिए:
   mongo
   ```

#### Linux/Mac पर MongoDB:

```bash
# Install MongoDB
sudo apt-get install mongodb  # Ubuntu/Debian
brew install mongodb-community  # Mac

# Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac
```

### Step 3: Database Structure

MongoDB automatically `portfolio` database create करेगा जब पहली बार data insert होगा।

**Collections:**
- `projects` - Portfolio projects
- `contacts` - Contact form messages

### Step 4: Test Connection

1. **Development Server Start करें:**
   ```bash
   npm run dev
   ```

2. **Check Console:**
   - MongoDB connection successful होने पर कोई error नहीं दिखेगा
   - Error आने पर MongoDB service check करें

3. **Test API:**
   - `http://localhost:3000/api/projects` - Projects list
   - `http://localhost:3000/api/contact` - Contact messages

### Step 5: Admin Dashboard Access

1. Browser में जाएं: `http://localhost:3000/admin/login`
2. Credentials enter करें:
   - Username: `admin` (या `.env.local` में जो set किया है)
   - Password: `admin123` (या `.env.local` में जो set किया है)

## MongoDB Atlas (Cloud) के लिए

अगर MongoDB Atlas use करना चाहते हैं:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Troubleshooting

### Error: "MongoDB connection error"

**Solutions:**
1. MongoDB service running है या नहीं check करें:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl status mongod
   ```

2. Port 27017 available है या नहीं check करें:
   ```bash
   # Windows
   netstat -an | findstr 27017
   
   # Linux/Mac
   lsof -i :27017
   ```

3. MongoDB URI सही है या नहीं verify करें:
   - Format: `mongodb://localhost:27017/`
   - No username/password needed for local MongoDB

### Error: "Database operations will be skipped"

- `.env.local` file exists है या नहीं check करें
- `MONGODB_URI` variable correctly set है या नहीं verify करें
- Server restart करें after `.env.local` changes

## Database Operations

### Projects Collection
- **GET** `/api/projects` - All projects
- **POST** `/api/projects` - Create project
- **GET** `/api/projects/[id]` - Get project by ID
- **PUT** `/api/projects/[id]` - Update project
- **DELETE** `/api/projects/[id]` - Delete project

### Contacts Collection
- **POST** `/api/contact` - Save contact message
- **GET** `/api/contact` - Get all messages (admin only)
- **GET** `/api/contact/[id]` - Get message by ID
- **PUT** `/api/contact/[id]` - Update message (mark as read)

## Next Steps

1. ✅ `.env.local` file create करें
2. ✅ MongoDB install और start करें
3. ✅ `npm run dev` से server start करें
4. ✅ Admin dashboard से projects manage करें
5. ✅ Contact form test करें

## Security Notes

⚠️ **Important:**
- `.env.local` file को कभी भी Git में commit न करें
- Production में strong passwords use करें
- `NEXTAUTH_SECRET` को random strong string से replace करें


