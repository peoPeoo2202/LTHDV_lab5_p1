# 🚀 Quick Start Guide

## Bước 1: Cài đặt Dependencies
```bash
npm install
```

## Bước 2: Cấu hình Environment
```bash
# Copy file environment
cp env.example .env

# Chỉnh sửa file .env với MongoDB URI của bạn
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/supplier-product-crud

# MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/supplier-product-crud
```

## Bước 3: Seed Database (Tùy chọn)
```bash
npm run seed
```

## Bước 4: Chạy Ứng dụng
```bash
# Development mode (recommended)
npm run dev

# Production mode
npm start
```

## Bước 5: Truy cập Ứng dụng
- **Web Interface**: http://localhost:3000
- **API Base URL**: http://localhost:3000/api

## 🧪 Test với Postman
1. Import file: `postman/lab-part1-crud.postman_collection.json`
2. Set `base_url` = `http://localhost:3000`
3. Chạy các request để test CRUD operations

## 📱 Giao diện Web
- **Trang chủ**: `/` - Dashboard với links
- **Suppliers**: `/suppliers` - Quản lý nhà cung cấp
- **Products**: `/products` - Quản lý sản phẩm

## 🔧 Troubleshooting
- **Lỗi MongoDB**: Kiểm tra connection string trong `.env`
- **Port đã sử dụng**: Thay đổi PORT trong `.env`
- **Module not found**: Chạy `npm install`

---
**Chúc bạn code vui vẻ! 🎉**
