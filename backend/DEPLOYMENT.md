# PostgreSQL / Neon deployment

The backend uses Prisma ORM 6 and PostgreSQL. MongoDB is no longer used.
This creates an empty application database and five starter course categories.
It does **not** copy old Atlas users, courses, enrollments or media metadata.
Recover those from the original database/export before retiring Atlas if needed.
Cloudinary media files themselves remain in Cloudinary.

## Existing Render backend

1. Create a Neon project and copy its PostgreSQL connection URL from **Connect**.
2. In Render's backend service **Environment**, set `DATABASE_URL` to that URL
   (without surrounding quotes or a `psql` command). Retain `sslmode=require`.
   Pooled and direct Neon URLs are supported. The backend derives a direct URL
   for migrations from the Neon pooled hostname; an explicit `DIRECT_URL` can
   override this. Remove the old `MONGODB_URL`.
3. Keep your existing `JWT_SECRET`, email, Cloudinary and Razorpay variables.
   See `.env.example` for exact names. Only the database setting changes.
4. Confirm **Root Directory** is `backend`, **Build Command** is `npm ci`
   (`npm install` also works), and **Start Command** is `npm start` or your existing
   `node index.js`. The checked-in `.node-version` pins Node 22.22.0. If Render
   already has a `NODE_VERSION` environment override, set it to `22.22.0` too.
   Push these changes and deploy.
5. The install generates Prisma Client. Startup applies the committed SQL
   migrations, seeds categories idempotently, then connects to PostgreSQL before
   listening on Render's `PORT`. Set Render's health check path to `/health`.

A fresh Render Blueprint can use the repository's `render.yaml`. An existing
service does not automatically adopt that YAML. Add email/media/payment settings
from `.env.example` for those features. Set `FRONTEND_URL` if your frontend differs
from the existing Vercel URL. Never put DATABASE_URL in frontend/VITE variables.

Users must sign up again on a fresh database. Signups create Student or Instructor
accounts; administrator accounts must be provisioned by a trusted database admin.
Starter categories allow instructors to create courses immediately.

## Local development

Requires Node >=22.12 (22 or 24) and a PostgreSQL database.

```sh
cd backend
cp .env.example .env
# Fill in DATABASE_URL, JWT_SECRET and integration credentials in .env.
npm ci
npm start
```

`npm run dev` also performs the migration/seed on startup. For schema changes,
edit `prisma/schema.prisma`, run `npx prisma migrate dev --name descriptive_name`
on a development database, and commit the resulting migration and schema.
Production startup uses `prisma migrate deploy`, never `db push` or reset.

## Validation

```sh
npm test
# Use a disposable PostgreSQL database ONLY: the integration suite clears it.
TEST_DATABASE_URL='postgresql://user:password@localhost:5432/classnotion_test' npm run test:integration
```

The integration test applies the actual migration and exercises auth/OTP expiry,
course and lesson CRUD, enrollment/payment retries, reviews, progress and cascade
cleanup. Email, Cloudinary and Razorpay network calls are stubbed in tests; test
these services with your configured sandbox accounts before accepting real payments.
