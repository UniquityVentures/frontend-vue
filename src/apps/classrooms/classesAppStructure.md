# Structure for the Classes and Subjects Apps

## Classroom-first approach

- Classrooms are the center of the software
- Each classroom has subjects, announcements, and members
- Other parameters of the classroom - like teachers, syllabus, assignments, assessments are inherited by subjects of that classroom
- Subjects are nested INSIDE the classroom - user creates and manages subjects INSIDE the classroom. This is a key difference from the current approach, which has all the models literally as separate apps. It is difficult for a user to understand the relationships between the models.
- The idea is to center everything around a classroom so that is is easier to understand. Everything that happens in a classroom stays in the classroom.
- Our core concept is to get teachers to do the work of creating content, it NEEDS to be easy to use.

### Announcements:

- Every announcement is targeted to classrooms. Creation of announcements is done INSIDE a classroom, not outside in a separate app. 
- Apart from school-wide announcements - these are created only by admins, and are automatically added to all classrooms
- There is a setting - inside the classroom to enable/disable subject based announcements. This is disabled by default. When enabled, announcements can be made to subjects, and these will be shown in the classroom too - but with a slight UI change that shows the subject these belong to.

### Teachers:

- This is trickier than it first seems.
- Teachers are assigned to classrooms. Every classroom has a lead teacher, and other teachers. This is for access control.
- But teachers are also assigned to subjects. And subjects have their own lead-teacher, and other-teachers
- The teachers of a classroom are a concatenation of the lead-teacher, other-teachers and the lead-teacher and other-teachers of the subjects of the classroom. All these teachers have access to most of the stuff in the classroom.
- the other-teachers fields are optional, and are mostly discouraged. While creation, only the lead teacher is usually assigned. But if the user wants to assign other teachers, they can do so - to give access basically.

### Events

- Also created INSIDE classroom. Each classroom can have events, and will also have exams. The classroom calendar will be a combination of all of these. Of course, school-wide events are added to all classrooms.

### Students

- Students can be assigned to multiple classrooms, but they usually never need to be. Hence, the student view of the website starts with the classroom view itself. 
- Students are given discipline scores, and marks inside the subjects. This information is combined from all the subjects to the classroom.

### Initial setup:

- In the initial setup for a school - we will first add the list of staff members, then we create the classrooms.
- Once the classrooms are created, we can add all the students. They can either be given a join code and asked to make an account or we can create accounts for them. anything works.

### Benefits of this approach:

- It mimics a school. Schools are made of classrooms and classrooms are made of subjects. Announcements are made to clasrooms and exams are assigned to subjects. Therefore it is very easy to understand.
- The core concept is to get teachers to make content. Multiple teachers are given access to any classroom, which will be useful for some less-technically-inclined teachers.

### Problems with this approach:

- Stuff like announcements and events, that need to be assigned to multiple classrooms sometimes will incur additional work.
  - This can be mitigated - however. We can have an "advanced" tab where there are options like "Announce to multiple classrooms" or "Create event for multiple classrooms"
  - This will be hidden from the user by default, and only shown when the user selects "advanced". We are enforcing a classroom first approach.
- Subject teachers will have slightly more access than required. A subject teacher is basically also being given access to most of the content in the classroom. They are creating announcements, events, etc.
- Initial setup is very complex. There is no clear way to add students or teachers and assign them to classrooms. There are multiple manytomany relationships and it is difficult to create excel sheets.
  - To mitigate this, we can restrict bulk uploads of manytomany relationships.
  - This will however involve us having to make classroom a foreignkey for student.
  - we can have an other-classrooms field for students. But this is still very complicated.

## Subject-first approach

- This time, subjects are the center. Everything revolves around a subject. (We will call it a class or course)
- Classrooms as a concept lose all meaning. We just have subjects. Each subject is allotted a main teacher, other teachers and a list of students. 
- Announcements, assignments, events, syllabus, marks etc are all created INSIDE the subject. The classroom loses all meaning. 
- Students, at the home page will see a list of subjects they have joined, alongside an overview of whatever announcements, assignments, events, etc are there in those subjects.
- This is basically google classrooms - but with added features.

### Announcements:

- created inside the subject. There is an advanced option to create announcements to classrooms or subjects.

### Classrooms:

- These just dont exist anymore. Each student is assigned a Standard and division and roll number, but that is it. Classrooms are no longer a definite object in the database. - This is because there is no longer any data inherent to a classroom.
  - Attendance is a daily thing, and can be done in its own app. We can filter students based on classroom in the attendance app.
  - Everything else, announcements, assignments, events, syllabus, marks, etc are all derived for each student from the subjects they are enrolled in. 

### Initial Setup:

- We can first add the teachers, and then the students via excel sheets. Then we can create all "courses", and ask students to enroll in them. (Just like google classrooms)

### Benefits of this approach:

- Its just as easy to understand as the classroom approach, it has added simplicity, but it does not follow the school structure.
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

- We will go with the classroom-first approach - the reason is as follows:
  - Classroom is a `PrimaryKey` on Subject. This means that each subject is inherently bound to a single classroom. 
  - So it has already been established, that subjects are inside classrooms. We just haven't implemented it in the frontend yet.


## Further problems with the classroom-first approach:

- There are cases where different students in the same classroom have a different set of subjects. There could be a student enrolled in class 10A who only switches classes for a single subject, which he studies in class 10C. This is not possible in the current approach. 
- There are a few ways to solve this: 
  - Enforcing the Subjects-inside-classrooms relationship: This means that each subject will be inside a classroom. In this method - students will be enrolled in a classroom, and they will only have access to the Subjects inside that classroom. They can join a subset of the subjects of the classroom they are enrolled in. Students will need to be enrolled in multiple classrooms. 
  - Separating the Classroom and Subject apps: Subjects and Classrooms are ManyToMany, each subject can now be in multiple classrooms. So now we can control which classrooms can have which subjects openly. We no longer need to give Students access to multiple classrooms, we can just add this subject to their classroom. This seems like the right choice.

## Implementation plan:

- Now classrooms and subjects are different apps again. 
- Student is assigned to a single classroom. He can join any number of subjects. 
- Classroom and Subjects are ManyToMany.
- Don't focus on the names of 'Classroom' or 'Subject'. 'Classroom' is basically an entity that a Student cannot have multiple of and 'Subject' is basically an entity that a Student can have multiple of. These entities are ManyToMany with each other, so any combination is possible.
