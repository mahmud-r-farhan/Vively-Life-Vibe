# CRUD API Documentation

**App Name**: CRUD API  
**Overview**: A full-stack application for user management with authentication, image uploads via Cloudinary, and a responsive React frontend. Built with Node.js (Express) backend and React (Vite) frontend.

## Backend

**Tech Stack**: Node.js, Express, MongoDB, Mongoose, Cloudinary, JWT, bcrypt  
**Directory**: `server/`

### Key Features
- **Authentication**: Register (`/auth/register`), login (`/auth/login`) with JWT.
- **User Management**: CRUD operations (`/users`) with admin role checks.
- **Image Handling**: Cloudinary for profile picture uploads/deletions.
- **Security**: Password hashing (bcrypt), JWT validation, input sanitization.
- **Pagination**: Supports `page` and `limit` for `/users` endpoint.

### Setup
1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```
2. **Environment Variables** (`backend/.server`):
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/crud-api
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. **Run Server**:
   ```bash
   npm run dev
   ```

### Endpoints
- **POST /auth/register**: Register user (multipart form-data with image).
- **POST /auth/login**: Login user, returns JWT.
- **GET /profile**: Get authenticated user's profile.
- **GET /users**: List users (paginated).
- **GET /users/:id**: Get user by ID.
- **POST /users**: Create user (admin only).
- **PUT /users/:id**: Update user (admin or self).
- **DELETE /users/:id**: Delete user (admin only).

### Notes
- **Security**: Validates inputs, sanitizes data, and uses secure Cloudinary uploads.
- **Error Handling**: Middleware for consistent error responses.
- **Cloudinary**: Uploads images to `devplus_users` folder; deletes on user update/delete.
- **Pagination**: Returns `x-total-count` header for `/users`.

## Frontend

**Tech Stack**: React 18, Vite, Tailwind CSS, Radix UI, Axios, @cloudinary/url-gen, Zod, DOMPurify  
**Directory**: `frontend/`

### Key Features
- **Authentication**: Login, register, profile pages with JWT in `localStorage`.
- **User Management**: CRUD operations with pagination (9 users/page).
- **Cloudinary**: Backend-mediated uploads; frontend transformations for optimized images.
- **UI/UX**: Responsive design, loading spinners, toasts (Sonner), animations (Framer Motion).
- **Security**: Input sanitization (DOMPurify), form validation (Zod).

### Setup
1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```
2. **Environment Variables** (`frontend/.env`):
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```
4. **Build for Production**:
   ```bash
   npm run build
   ```

### Pages
- **Home (`/`)**: Welcome page with login/register or profile/users links.
- **Login (`/login`)**: Email/password form.
- **Register (`/register`)**: User creation with image upload.
- **Profile (`/profile`)**: Displays user details and Cloudinary-hosted image.
- **Users (`/users`)**: Lists users with pagination, create/edit/delete (admin).
- **User Edit (`/users/edit/:id`)**: Edit user details/image.

### Cloudinary Integration
- **Uploads**: Sent via `FormData` to backend; max 3MB, JPEG/PNG/GIF.
- **Transformations**: Uses `@cloudinary/url-gen` for resized images (e.g., 48x48).
- **Preview**: Local previews with remove button; cleaned up with `URL.revokeObjectURL`.
- **Error Handling**: Toasts for Cloudinary errors (e.g., invalid file).

### Security
- **Sanitization**: DOMPurify for user inputs.
- **Validation**: Zod for forms; aligns with backend (e.g., password complexity).
- **Auth**: Axios interceptor handles 401s, redirects to login.

## Production Notes
- **Backend**:
  - Use HTTPS; configure CORS for specific origins.
  - Implement rate limiting and CSRF protection.
  - Switch to HTTP-only cookies for JWT.
- **Frontend**:
  - Deploy to Vercel/Netlify; ensure env vars are set.
  - Add error tracking (e.g., Sentry).
  - Consider TypeScript for type safety.
- **Testing**: Add backend (Jest/Supertest) and frontend (Cypress/Vitest) tests.
- **Performance**: Lazy-load routes; optimize Cloudinary transformations.

## Limitations
- **Token Security**: `localStorage` vulnerable to XSS; prefer cookies.
- **Client-Side Uploads**: Not implemented; backend-mediated for security.
- **Accessibility**: Needs further screen reader testing.

**Deployment**: Run backend on a server (e.g., Render); host frontend statically. Ensure MongoDB and Cloudinary credentials are secure.