# Structure for the Classes and Courses Apps

## Batch-first approach

- Batches are the center of the software
- Each batch has courses, announcements, and members
- Other parameters of the batch - like teachers, syllabus, assignments, assessments are inherited by courses of that batch
- Courses are nested INSIDE the batch - user creates and manages courses INSIDE the batch. This is a key difference from the current approach, which has all the models literally as separate apps. It is difficult for a user to understand the relationships between the models.
- The idea is to center everything around a batch so that is is easier to understand. Everything that happens in a batch stays in the batch.
- Our core concept is to get teachers to do the work of creating content, it NEEDS to be easy to use.

### Announcements:

- Every announcement is targeted to batches. Creation of announcements is done INSIDE a batch, not outside in a separate app. 
- Apart from school-wide announcements - these are created only by admins, and are automatically added to all batches
- There is a setting - inside the batch to enable/disable course based announcements. This is disabled by default. When enabled, announcements can be made to courses, and these will be shown in the batch too - but with a slight UI change that shows the course these belong to.

### Teachers:

- This is trickier than it first seems.
- Teachers are assigned to batches. Every batch has a lead teacher, and other teachers. This is for access control.
- But teachers are also assigned to courses. And courses have their own lead-teacher, and other-teachers
- The teachers of a batch are a concatenation of the lead-teacher, other-teachers and the lead-teacher and other-teachers of the courses of the batch. All these teachers have access to most of the stuff in the batch.
- the other-teachers fields are optional, and are mostly discouraged. While creation, only the lead teacher is usually assigned. But if the user wants to assign other teachers, they can do so - to give access basically.

### Events

- Also created INSIDE batch. Each batch can have events, and will also have exams. The batch calendar will be a combination of all of these. Of course, school-wide events are added to all batches.

### Students

- Students can be assigned to multiple batches, but they usually never need to be. Hence, the student view of the website starts with the batch view itself. 
- Students are given discipline scores, and marks inside the courses. This information is combined from all the courses to the batch.

### Initial setup:

- In the initial setup for a school - we will first add the list of staff members, then we create the batches.
- Once the batches are created, we can add all the students. They can either be given a join code and asked to make an account or we can create accounts for them. anything works.

### Benefits of this approach:

- It mimics a school. Schools are made of batches and batches are made of courses. Announcements are made to clasrooms and exams are assigned to courses. Therefore it is very easy to understand.
- The core concept is to get teachers to make content. Multiple teachers are given access to any batch, which will be useful for some less-technically-inclined teachers.

### Problems with this approach:

- Stuff like announcements and events, that need to be assigned to multiple batches sometimes will incur additional work.
  - This can be mitigated - however. We can have an "advanced" tab where there are options like "Announce to multiple batches" or "Create event for multiple batches"
  - This will be hidden from the user by default, and only shown when the user selects "advanced". We are enforcing a batch first approach.
- Course teachers will have slightly more access than required. A course teacher is basically also being given access to most of the content in the batch. They are creating announcements, events, etc.
- Initial setup is very complex. There is no clear way to add students or teachers and assign them to batches. There are multiple manytomany relationships and it is difficult to create excel sheets.
  - To mitigate this, we can restrict bulk uploads of manytomany relationships.
  - This will however involve us having to make batch a foreignkey for student.
  - we can have an other-batches field for students. But this is still very complicated.

## Course-first approach

- This time, courses are the center. Everything revolves around a course. (We will call it a class or course)
- Batches as a concept lose all meaning. We just have courses. Each course is allotted a main teacher, other teachers and a list of students. 
- Announcements, assignments, events, syllabus, marks etc are all created INSIDE the course. The batch loses all meaning. 
- Students, at the home page will see a list of courses they have joined, alongside an overview of whatever announcements, assignments, events, etc are there in those courses.
- This is basically google batches - but with added features.

### Announcements:

- created inside the course. There is an advanced option to create announcements to batches or courses.

### Batches:

- These just dont exist anymore. Each student is assigned a Standard and division and roll number, but that is it. Batches are no longer a definite object in the database. - This is because there is no longer any data inherent to a batch.
  - Attendance is a daily thing, and can be done in its own app. We can filter students based on batch in the attendance app.
  - Everything else, announcements, assignments, events, syllabus, marks, etc are all derived for each student from the courses they are enrolled in. 

### Initial Setup:

- We can first add the teachers, and then the students via excel sheets. Then we can create all "courses", and ask students to enroll in them. (Just like google batches)

### Benefits of this approach:

- Its just as easy to understand as the batch approach, it has added simplicity, but it does not follow the school structure.
- Ease of initial setup is another big benefit.


## Model based approach

- This is the most complex approach for a user to understand. But it is the simplest to implement. 
- The app structure mimics the database structure, and we make create-edit-delete easier for everyone. 
- This is what we are doing currently, I dont feel like it will work.
- The only way this will work is if we assign the entire data uploading workload to one school admin. He can be given the software and the task of learning how to operate. 
- We can no longer expecct all the teachers to be accustomed to this sort of setup. The teachers will not be as technically inclined. 

### Benefits of this approach:

- Easiest to implement (already done)
- Most amount of features. But there is high complexity and properly operating the software is going to need some skill.

### Problems with this approach:

- Not intuitive for user.

## Our selection

- We will go with the batch-first approach - the reason is as follows:
  - Batch is a `PrimaryKey` on Course. This means that each course is inherently bound to a single batch. 
  - So it has already been established, that courses are inside batches. We just haven't implemented it in the frontend yet.


## Further problems with the batch-first approach:

- There are cases where different students in the same batch have a different set of courses. There could be a student enrolled in class 10A who only switches classes for a single course, which he studies in class 10C. This is not possible in the current approach. 
- There are a few ways to solve this: 
  - Enforcing the Courses-inside-batches relationship: This means that each course will be inside a batch. In this method - students will be enrolled in a batch, and they will only have access to the Courses inside that batch. They can join a subset of the courses of the batch they are enrolled in. Students will need to be enrolled in multiple batches. 
  - Separating the Batch and Course apps: Courses and Batches are ManyToMany, each course can now be in multiple batches. So now we can control which batches can have which courses openly. We no longer need to give Students access to multiple batches, we can just add this course to their batch. This seems like the right choice.

## Implementation plan:

- Now batches and courses are different apps again. 
- Student is assigned to a single batch. He can join any number of courses. 
- Batch and Courses are ManyToMany.
- Don't focus on the names of 'Batch' or 'Course'. 'Batch' is basically an entity that a Student cannot have multiple of and 'Course' is basically an entity that a Student can have multiple of. These entities are ManyToMany with each other, so any combination is possible.
