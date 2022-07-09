# Kanban Task Manager

This project is based on the [Frontendmentor.io task manager challenge](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB)


## Technology used

The task manager was built using the MERN stack. 
The front end uses React, react-router, react-icons and axios, paired with custom css modules to make it look great.
The backend is based on Express and mongoose, utilizing jwt for user Authentication for each route to the api and bcrypt on user passwords so there are no plain text passwords stored on the database.
### Screenshots

Desktop Darkmode: \
![image](https://user-images.githubusercontent.com/76035004/178115635-44ab8769-7225-4044-8572-6a3f9d7fc2fb.png)\
Desktop Lightmode:\
![image](https://user-images.githubusercontent.com/76035004/178115663-ab206823-15c7-4dbe-b7e0-5d087434540b.png)\
Tablet View:\
![image](https://user-images.githubusercontent.com/76035004/178115688-d1853830-99f6-4475-a10d-f8cd76363a0f.png)\
Mobile View:\
![image](https://user-images.githubusercontent.com/76035004/178115728-d419200a-6029-49bc-959f-4c75e05bc546.png)


### Features

The task manager allows users to register an account and log in to manage their own projects. The user can create a board for each project and assign it tasks. each task is displayed in the task view area with the title and number of complete subtasks. As a user checks off that a subtask is complete, the task is moved into the corresponding column. users can delete entire boards or just single tasks. 

### Live Build
You can check out the live site here: [Kanban Task Manager](https://mhkanbantaskmanager.netlify.app)
