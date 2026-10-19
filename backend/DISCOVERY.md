# Course discovery and educator profiles

After login, all account types land on `/courses`. A signed-in visit to `/` also
redirects there. Guests keep the marketing home page. The footer's signup banner
is hidden whenever the frontend has a login token.

- `/courses` shows every published course, with search, category filters and sort.
- `/educators` lists instructors who have at least one published course.
- `/educators/:educatorId` shows the educator's public bio and their published courses.
- Course cards and course detail pages link back to the educator's profile.
- Instructors can use **Manage my courses** to reach the existing private builder.
  Those queries and all edits remain scoped to the authenticated instructor.

## Relationships and APIs

The existing Prisma relationship is the source of truth:
`User.teachingCourses <-> Course.instructorId`. Creating or editing a course
updates discovery and the educator's public profile automatically; no duplicate
course lists or manually maintained teacher associations are stored.

`GET /api/v1/course/getAllCourses` returns published courses.
`GET /api/v1/educators` returns public educator summaries.
`GET /api/v1/educators/:educatorId` returns the public profile and published courses.
These read APIs do not expose passwords, contact numbers, reset tokens or lesson
video URLs. Public educator/course author fields exclude email addresses too.

`POST /api/v1/course/enrollFree` requires a Student JWT and a published course
whose price is zero. It creates the enrollment and course progress together in a
transaction. Paid courses still require the existing verified payment flow.

## Demo content

Run `npm run db:seed:demo` from `backend` against the intended database.
It adds **4 fictional educators, 8 free published demo courses, and 24 sample
lessons** across the five starter categories. Each educator owns two courses.
Stable record IDs make repeated runs idempotent. Existing demo records are not
overwritten; existing real users and courses are never modified.

Educator accounts use random, unrecoverable demo passwords and reserved `.invalid`
email addresses. They are display fixtures, not shared login accounts. The SVG
course thumbnails and educator avatars live under `frontend/public/assets`.
Lessons explicitly describe their practice prompts and identify the bundled
`banner.mp4` as a demonstration clip rather than a course recording.

Demo seeding is deliberate, not part of every application startup. New databases
only receive starter categories until this command is run. Neon has been seeded
for this request; deploy both backend API changes and frontend assets/UI.
