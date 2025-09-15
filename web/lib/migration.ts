import { addTeacherWithCredentials } from './auth-db';

// Migration helper to move localStorage teachers to MongoDB
export async function migrateLocalStorageTeachers(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  try {
    const stored = localStorage.getItem('teacher-credentials-store');
    if (!stored) return;
    
    const localTeachers = JSON.parse(stored);
    console.log('Found local teachers to migrate:', localTeachers.length);
    
    for (const teacherCred of localTeachers) {
      try {
        // Create teacher in MongoDB with the same password
        const result = await fetch('/api/teachers/migrate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: teacherCred.teacher.name,
            email: teacherCred.teacher.email,
            department: teacherCred.teacher.department,
            teacherId: teacherCred.teacherId,
            password: teacherCred.password
          }),
        });
        
        if (result.ok) {
          console.log(`Migrated teacher: ${teacherCred.teacher.name}`);
        }
      } catch (error) {
        console.error(`Failed to migrate teacher ${teacherCred.teacher.name}:`, error);
      }
    }
    
    // Clear localStorage after successful migration
    localStorage.removeItem('teacher-credentials-store');
    console.log('Migration completed, localStorage cleared');
    
  } catch (error) {
    console.error('Migration error:', error);
  }
}
