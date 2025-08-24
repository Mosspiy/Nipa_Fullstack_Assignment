# 📝 Nipa Fullstack Assignment – Helpdesk App

โปรเจกต์นี้เป็น **ระบบ Helpdesk** พัฒนาแบบ Fullstack  
Frontend: Vue 3 (Vite, Tailwind, DaisyUI, Pinia, Axios)  
Backend: Node.js (Express.js, Mongoose, Helmet, Zod, Swagger)  
Database: MongoDB (container ผ่าน Docker Compose)

---

## 🚀 ฟีเจอร์หลัก
- **Submit Page**: ผู้ใช้สร้าง ticket (title, description) และดูรายการ ticket ที่เคยส่ง
- **Desk Page**: เจ้าหน้าที่ดู ticket แบบ **Kanban board** (Pending → Accepted → Resolved → Rejected) และอัปเดตสถานะได้ด้วย drag & drop หรือ กดปุ่ม
- **Ticket Detail**: popup modal แสดงรายละเอียด ticket
- **Filter by status**: กรอง ticket ตามสถานะ
- **Toast แจ้งเตือน**: ใช้ SweetAlert2
- **Swagger API Docs**: เอกสาร API พร้อม Try it out
- **Security**: Helmet (HTTP headers), Zod (validate input), Error handler

---
