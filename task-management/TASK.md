# MERN Stack Task Management Application

## Project Goal

Build a production-quality full-stack Task Management application using the MERN stack.

The application must support:

- User Authentication (Register/Login/Logout)
- Secure JWT Authentication
- Task CRUD Operations
- Task Filtering & Sorting
- Responsive Dashboard
- Modern UI/UX
- Mobile & Desktop Support
- Clean Architecture
- Production-ready code structure

The final result should look like a real SaaS productivity tool rather than a basic CRUD project.

---

# Tech Stack

## Frontend

- React.js (latest)
- Vite
- React Router DOM
- Axios
- Zustand (preferred) or Redux Toolkit
- React Hook Form
- Zod Validation
- Tailwind CSS
- Framer Motion
- React Hot Toast
- Lucide React Icons

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Development

- ESLint
- Prettier
- dotenv

---

# Folder Structure

## Frontend

```txt
client/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── auth/
│   │   ├── tasks/
│   │   ├── layouts/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │
│   ├── hooks/
│   ├── store/
│   ├── routes/
│   ├── utils/
│   ├── services/
│   ├── styles/
│   └── App.jsx
│
└── package.json
```

## Backend

```txt
server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   └── app.js
│
├── .env
└── package.json
```

---

# UI/UX Requirements

### Design Inspiration

- Notion
- Linear
- ClickUp
- Trello

### Theme

Modern SaaS Dashboard

### Color Palette

```css
Primary: #6366F1;
Primary Hover: #4F46E5;

Success: #22C55E;
Warning: #F59E0B;
Danger: #EF4444;

Background: #F8FAFC;
Card: #FFFFFF;

Text Primary: #0F172A;
Text Secondary: #64748B;
Border: #E2E8F0;
```

### Typography

```txt
Font Family: Inter

Heading Weight: 600-700
Body Weight: 400-500
```

### Spacing

```txt
8px spacing system
```

### Animations

- Smooth page transitions
- Hover effects
- Button interactions
- Modal transitions
- Skeleton loaders

---

# Authentication Module

## Register Page

### Fields

- Full Name
- Email
- Password
- Confirm Password

### Validation

- Name minimum 3 characters
- Valid email format
- Password minimum 8 characters
- Confirm password must match

### UI

Two-column layout on desktop:

Left side:
- Product illustration
- Welcome text

Right side:
- Registration card

---

## Login Page

### Fields

- Email
- Password
- Remember Me

### Features

- Password visibility toggle
- Form validation
- Loading state
- Error handling

### UI

Modern authentication card centered on screen.

---

# Dashboard

## Layout

```txt
---------------------------------------
Sidebar        | Header
---------------------------------------
Statistics Cards
---------------------------------------
Filters
---------------------------------------
Tasks Grid/List
---------------------------------------
```

---

# Sidebar

### Menu Items

- Dashboard
- All Tasks
- Pending Tasks
- Completed Tasks
- Profile
- Logout

### Behavior

Desktop:
- Fixed sidebar

Mobile:
- Drawer sidebar

---

# Header

Contains:

- Search Bar
- Notification Icon
- User Avatar
- User Name
- Logout Button

---

# Dashboard Statistics

Display four cards.

### Total Tasks

Shows total tasks count.

### Completed Tasks

Shows completed tasks count.

### Pending Tasks

Shows pending tasks count.

### Completion Rate

Shows percentage.

Use subtle gradients and icons.

---

# Task Management Module

## Task Schema

```js
{
  title: String,
  description: String,
  status: "pending" | "completed",
  priority: "low" | "medium" | "high",
  dueDate: Date,
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

# Create Task

### Form Fields

- Title
- Description
- Priority
- Due Date

### Validation

- Title required
- Description optional
- Due date optional

---

# Edit Task

- Prefilled form
- Modal interface

---

# Delete Task

Show confirmation modal.

```txt
Are you sure you want to delete this task?
This action cannot be undone.
```

---

# Task Card Design

Display:

```txt
Task Title
Task Description

Priority Badge
Status Badge

Due Date

Actions:
Edit
Delete
Mark Complete
```

### Priority Colors

```txt
Low      → Green
Medium   → Yellow
High     → Red
```

### Status Colors

```txt
Pending     → Orange
Completed   → Green
```

---

# Search, Filter & Sort

## Search

Search by:

- Title
- Description

---

## Filter

### Status

- All
- Pending
- Completed

### Priority

- All
- Low
- Medium
- High

---

## Sort

Options:

- Newest First
- Oldest First
- Due Date
- Priority

---

# Empty State

Display illustration.

```txt
No Tasks Found
Create your first task to get started.
```

---

# Backend Architecture

Use clean architecture:

```txt
Routes
↓
Controllers
↓
Services
↓
Database Layer
```

---

# MongoDB Models

## User Model

```js
{
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
}
```

---

## Task Model

```js
{
  title: String,

  description: String,

  status: {
    type: String,
    enum: ["pending", "completed"]
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },

  dueDate: Date,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}
```

---

# Authentication API

## Register

### Endpoint

```http
POST /api/auth/register
```

### Flow

1. Validate input
2. Check existing email
3. Hash password
4. Create user
5. Return success response

### Response

```json
{
  "success": true,
  "message": "User created successfully"
}
```

---

## Login

### Endpoint

```http
POST /api/auth/login
```

### Flow

1. Find user
2. Compare password
3. Generate JWT
4. Return token and user

### Response

```json
{
  "success": true,
  "token": "jwt_token",
  "user": {}
}
```

---

## Logout

Frontend-only logout.

Remove:

```txt
token
user
```

from local storage.

---

# JWT Authentication

### Token Expiry

```txt
7 Days
```

### Protected Routes

```txt
/api/tasks/*
```

### Request Header

```http
Authorization: Bearer TOKEN
```

### Unauthorized Response

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

Return status:

```txt
401
```

---

# Task APIs

## Create Task

```http
POST /api/tasks
```

---

## Get Tasks

```http
GET /api/tasks
```

### Query Parameters

```txt
search=
status=
priority=
sort=
page=
limit=
```

Support pagination.

---

## Get Single Task

```http
GET /api/tasks/:id
```

---

## Update Task

```http
PUT /api/tasks/:id
```

---

## Delete Task

```http
DELETE /api/tasks/:id
```

---

# Security Requirements

## Password Hashing

Use:

```txt
bcryptjs
```

---

## JWT

Use:

```txt
jsonwebtoken
```

---

## Rate Limiting

Use:

```txt
express-rate-limit
```

---

## Security Headers

Use:

```txt
helmet
```

---

## CORS

Configure:

```txt
Frontend URL only
```

---

# Validation

Use:

```txt
express-validator
```

or

```txt
zod
```

for server validation.

---

# Error Handling

Create global error middleware.

Response format:

```json
{
  "success": false,
  "message": "Error Message"
}
```

---

# Frontend State Management

Use Zustand.

## Auth Store

```js
{
  user,
  token,

  login(),
  register(),
  logout()
}
```

---

## Task Store

```js
{
  tasks,
  loading,

  fetchTasks(),
  createTask(),
  updateTask(),
  deleteTask()
}
```

---

# Routing Rules

## Public Routes

```txt
/login
/register
```

---

## Protected Routes

```txt
/
/dashboard
/tasks
/profile
```

---

# Route Guards

### If Token Missing

Redirect:

```txt
/login
```

### If User Logged In

Visiting:

```txt
/login
/register
```

Redirect to:

```txt
/dashboard
```

---

# Axios Configuration

Create centralized API instance.

Features:

- Base URL
- Timeout
- Request Interceptor
- Response Interceptor
- JWT Injection

Example:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
```

---

# Notifications

Use:

```txt
react-hot-toast
```

### Success

```txt
Task Created Successfully
Task Updated Successfully
Task Deleted Successfully
Login Successful
Registration Successful
```

### Error

Display API error message.

---

# Loading States

Implement:

- Full page loader
- Skeleton cards
- Button loading state
- API loading indicators

---

# Responsive Design

## Desktop

```txt
>= 1024px
```

---

## Tablet

```txt
768px - 1023px
```

---

## Mobile

```txt
< 768px
```

### Mobile Requirements

- Drawer sidebar
- Stacked cards
- Responsive forms
- Responsive filters

---

# Accessibility

Must Support:

- Keyboard navigation
- ARIA labels
- Focus states
- Semantic HTML

---

# Code Quality

Requirements:

- Reusable components
- Custom hooks
- Clean architecture
- No duplicated code
- Proper naming conventions
- ESLint compliance

---

# Bonus Features

Implement if time permits:

### Dark Mode

Theme toggle with persistence.

### Drag and Drop

Use:

```txt
@dnd-kit
```

for task reordering.

### Analytics

Charts displaying:

- Completed tasks
- Pending tasks
- Productivity trends

Use:

```txt
recharts
```

### Profile Page

Allow user to:

- View profile
- Edit profile

### Remember Me

Persist login state.

### Refresh Token Strategy

Implement secure refresh tokens.

---

# README Requirements

Generate complete README containing:

## Features

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

CLIENT_URL=http://localhost:5173

VITE_API_URL=http://localhost:5000/api
```

## Project Structure

## API Documentation

## Deployment Guide

## Screenshots Section

---

# Deliverables

The agent must generate:

1. Complete Backend
2. Complete Frontend
3. Authentication System
4. JWT Security
5. Protected Routes
6. Task CRUD
7. Search
8. Filter
9. Sort
10. Pagination
11. Responsive UI
12. Validation
13. Error Handling
14. Loading States
15. Toast Notifications
16. README
17. Sample Seed Data
18. Environment Examples

The final application must run successfully with:

```bash
cd server
npm install
npm run dev

cd client
npm install
npm run dev
```

No placeholders, no mock APIs, no incomplete implementations. Every feature must be fully functional and connected end-to-end.







#REDESIGN

# UI/UX SYSTEM (Complete Redesign)

## Product Direction

Build a premium productivity product rather than a "task CRUD dashboard".

Visual feel:

* Linear × Raycast × Notion × Vercel
* Minimal but dense
* Professional developer-tool aesthetics
* High information hierarchy
* Fast interactions
* Premium micro-interactions
* No artificial gradients everywhere
* No glassmorphism overload
* No template-looking dashboards

The UI should feel handcrafted.

---

# Design Principles

### 1. Functional Minimalism

Every element must serve a purpose.

Avoid:

* oversized cards
* unnecessary illustrations
* decorative gradients
* excessive shadows
* random icons

Prefer:

* whitespace
* typography hierarchy
* subtle borders
* motion
* alignment

---

### 2. Information Density

Dashboard should not feel empty.

Bad:

Huge cards with lots of spacing.

Good:

Compact but readable layouts similar to Linear.

---

### 3. Speed Perception

UI should feel extremely responsive.

Use:

* optimistic updates
* skeleton loading
* instant hover states
* animated transitions under 250ms

---

# Color System

## Light Theme

```css
Background:
#FAFAFA

Surface:
#FFFFFF

Surface Secondary:
#F5F5F5

Border:
#E4E4E7

Primary:
#111827

Accent:
#2563EB

Success:
#16A34A

Warning:
#D97706

Danger:
#DC2626

Text Primary:
#18181B

Text Secondary:
#71717A
```

---

## Dark Theme

```css
Background:
#09090B

Surface:
#18181B

Surface Secondary:
#27272A

Border:
#3F3F46

Primary:
#FAFAFA

Accent:
#3B82F6

Success:
#22C55E

Warning:
#F59E0B

Danger:
#EF4444

Text Primary:
#FAFAFA

Text Secondary:
#A1A1AA
```

Dark mode is required.

Theme preference must persist.

---

# Typography

Font:

```txt
Inter
```

Fallback:

```txt
system-ui
```

Scale:

```txt
Hero → 36px
Page Heading → 28px
Section Heading → 20px
Body → 15px
Small Text → 13px
Labels → 12px
```

Font weights:

```txt
400 Regular
500 Medium
600 SemiBold
700 Bold
```

Line height:

```txt
1.5
```

---

# Spacing System

Use an 8-point system.

```txt
4
8
12
16
24
32
40
48
64
```

Never use arbitrary spacing.

---

# Shadows

Use subtle shadows only.

```css
shadow-sm:
0px 1px 2px rgba(0,0,0,.05)

shadow-md:
0px 4px 10px rgba(0,0,0,.06)

shadow-lg:
0px 10px 25px rgba(0,0,0,.08)
```

---

# Authentication Experience

## Login/Register

Layout:

Desktop:

```txt
--------------------------------
Left Side

Brand
Headline
Feature bullets
Product preview image

-------------------------------

Right Side

Auth card
Inputs
Actions
-------------------------------
```

Left section should show:

```txt
Manage work without chaos
Track progress in real time
Stay organized effortlessly
```

Right side:

Compact card:

* logo
* heading
* form
* divider
* CTA

Card width:

```txt
420px max
```

---

# Dashboard Redesign

Layout:

```txt
---------------------------------------------------
Top Navigation
---------------------------------------------------

Page Heading + Actions

---------------------------------------------------

Metrics Row

---------------------------------------------------

Task Toolbar

---------------------------------------------------

Task Table/Kanban View
---------------------------------------------------
```

No permanent left sidebar on desktop.

Instead use:

Top navigation + collapsible command sidebar.

Reason:

Allows more content space.

---

# Top Navigation

Contains:

Left:

* Logo
* Dashboard
* Tasks
* Analytics

Center:

* Global Search

Right:

* Notifications
* Theme Toggle
* Profile Avatar

Height:

```txt
72px
```

Sticky on scroll.

Background blur:

```css
backdrop-filter: blur(12px)
```

---

# Statistics Cards

Instead of huge colorful cards:

Compact cards:

```txt
Total Tasks
Completed
Pending
Productivity Score
```

Card layout:

Icon
Value
Small trend indicator

Example:

↑ 12% this week

---

# Task Area

Provide view switch:

* List View
* Board View

Default:

List View

---

# List View

Professional table style.

Columns:

```txt
Task
Priority
Status
Due Date
Created
Actions
```

Hover:

* subtle background
* action buttons appear

---

# Board View

Kanban style:

```txt
Todo
In Progress
Completed
```

Drag-and-drop support.

---

# Task Card

Compact design:

Title

Small description preview

Badges:

[High]
[Pending]

Metadata:

Created Date
Due Date

Hover actions:

Edit
Delete
Complete

---

# Search + Filters

Single toolbar:

[Search]

[Status ▼]

[Priority ▼]

[Sort ▼]

[+ Create Task]

Sticky on scroll.

---

# Empty State

Do not use cartoon illustrations.

Use:

Minimal icon + text

```txt
No tasks yet

Start by creating your first task.
```

Button:

```txt
+ Create Task
```

---

# Motion System

Framer Motion required.

Rules:

Hover:

100–150ms

Modal:

200–250ms

Page transitions:

250ms

Button interaction:

scale(0.98)

Cards:

subtle lift on hover

Avoid:

* bounce effects
* exaggerated movement
* flashy transitions

---

# Component Rules

Buttons:

Primary:

Solid

Secondary:

Outline

Tertiary:

Ghost

Inputs:

Height:

```txt
44px
```

Border radius:

```txt
12px
```

Cards:

Border radius:

```txt
16px
```

Modals:

Border radius:

```txt
20px
```

---

# Mobile Experience

Bottom navigation:

Dashboard
Tasks
Analytics
Profile

Replace top navigation with:

Hamburger menu + search

Task cards become stacked.

Filters open as bottom sheet.

---

# Accessibility

Required:

* Keyboard shortcuts
* Focus rings
* Screen reader labels
* Semantic HTML
* Contrast ratio AA+

Keyboard shortcuts:

```txt
N → Create task
/ → Search
Esc → Close modal
```

---

# Premium Touches

Implement:

* Command palette (Ctrl+K)
* Theme persistence
* Skeleton loading
* Animated counters
* Toast animations
* Recent activity feed
* Productivity trend chart
* Profile dropdown
* Auto-save drafts
