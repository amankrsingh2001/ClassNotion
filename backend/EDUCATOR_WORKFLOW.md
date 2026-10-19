# Educator approval, lesson folders, and conversations

New signups always receive the Student role. Choosing “Apply to teach” creates
an empty educator application; it does not grant teaching privileges. Any signed-in
user can submit their professional profile from `/dashboard/educator-profile`.

Required application fields: professional headline, career introduction (80+
characters), years of experience, at least one career entry, and at least one
certificate with an HTTP(S) verification link. A YouTube channel/page is optional.
Credentials are checked by a human admin; links are not an automated verification.
Applications move from Draft to Pending, then Approved or Rejected. Rejected
applicants see the review note and can correct and resubmit their profile. Pending
and approved profiles are locked against applicant changes. Review endpoints only
accept pending applications, record reviewer/time/note, and reject self-review.

Admins review applications at `/dashboard/educator-reviews`. Approval grants the
Instructor role. Authorization reads the current database role on every request,
so a stale token cannot preserve privileges and approval works without token renewal.
The educator profile screen refreshes the local account data when opened or when
“Check review status” is selected. Existing real instructors must submit an
application and receive approval before creating or publishing new courses.
Existing course data and enrollments are preserved. Fictional demo educators stay
available as clearly identified demo display records with no shared login password.

Course details now require a project type: React, Next.js, Node.js, Python, or
Other. Existing courses retain a nullable project type until their owner selects
one in the course editor. New courses cannot be created without choosing it.

The curriculum step has lesson folders and nested subfolders. Add video lessons
through the section builder, then assign each lesson to a folder with its selector.
Folder access is limited to the course owner and enrolled learners; only an
approved course owner can mutate folders. A lesson or parent folder from another
course is rejected. Removing a folder also removes its subfolders but keeps their
lessons in the course root. Students open the same folders from the course player.
Limits: 200 folders per course, nesting depth 12, sibling names unique.
The reserved ProjectNode table from the initial additive migration is retained to
preserve migration history/data; it is not used by the lesson-folder interface.

Students start private conversations using “Message educator” in My learning or
“Message your instructor” in the course player. The enrolled student and that
course's instructor are the only participants. Every read/send rechecks enrollment;
removing enrollment blocks access for both participants. Each student/course pair
has one thread. Messages are plain text, maximum 5,000 characters. The inbox uses
manual refresh for replies, with pages of 50 messages and “Load earlier messages”.
It does not send external emails or expose educators’ private contact details.

## Deployment

Commit backend and frontend changes from the repository root and deploy both.
Keep existing environment variables. No new environment variable is needed.
Backend `postinstall` generates Prisma Client; normal startup applies checked-in
migrations. Both new migrations have already been applied to the configured Neon
database. Do not edit applied migration SQL or use `prisma db push` to replace it.

The designated reviewer account is `amankrsinghadmin@gmail.com`; its password was
set directly using bcrypt and is not stored in this repository.

## Validation

Frontend: `npm run build --prefix frontend`.
Backend: `TEST_DATABASE_URL=postgresql://…/classnotion_test npm test --prefix backend`.
Use a disposable PostgreSQL database whose name ends in `_test`; the integration
suite deliberately clears fixture data and refuses application database names.
Tests cover approval gates, admin-only review, rejected-profile resubmission,
malformed credential links, stale JWT roles, required project type, nested folder
ownership/enrollment, folder deletion preserving lessons, conversation isolation,
access revocation after unenrollment, payments, profiles, and database cleanup.
