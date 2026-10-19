-- AlterTable
ALTER TABLE "SubSection" ADD COLUMN     "folderId" TEXT;

-- CreateTable
CREATE TABLE "CourseFolder" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "parentId" TEXT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseFolder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseFolder_parentId_idx" ON "CourseFolder"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseFolder_courseId_path_key" ON "CourseFolder"("courseId", "path");

-- AddForeignKey
ALTER TABLE "SubSection" ADD CONSTRAINT "SubSection_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "CourseFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFolder" ADD CONSTRAINT "CourseFolder_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseFolder" ADD CONSTRAINT "CourseFolder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CourseFolder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

