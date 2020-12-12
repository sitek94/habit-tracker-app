# Habit Tracker

## About

**Habit Tracker** is my final project for [CS50's Introduction to Computer Science Course](https://www.edx.org/course/cs50s-introduction-to-computer-science).
The app lets you keep track of your habits. You can add new habit and edit or delete existing ones.

### Screenshots

* Landing Page
![Landing Page](screenshots/landing.png)

* Sign up using **Facebook**, **GitHub**, **Google** or create a new account using your email address.
![Sign in](screenshots/sign-up.png)

* Create new habit
![Create habit](screenshots/add-habit.png)

* Manage your habits - preview, edit or delete your habits
![Manage habits](screenshots/manage-habits.png)

* Keep track of your habits in the Dashboard
![Dashboard](screenshots/dashboard.png)

* Change your settings
![Settings](screenshots/settings.png)

* Customize the app the way you want
![Custom theme](layout-theme.png)

## Technologies and libraries used

* React
* React Query
* React Router
* React Hook Form
* Material UI
* Firebase
  * Authentication
  * Realtime Database

## Challenges

I learned a lot while building the project and for sure I'm going to learn a lot more while maintaining it. 
That's why I want to keep track of the challenges that I've had along the way so that I can reference them in the future.

### Database and data structure

How should I store habit's completion state for each day? Should each habit have an array with the dates 
when it was performed or should I store dates and each date would keep track of the habits that where performed on that day? 

I tried to structure the data so that it is saved and retrieved as easily as possible. To do so I've been following 
[Firebase guidelines](https://firebase.google.com/docs/database/web/structure-data) and in the end came up with the following data structure:

```json
{
    "habits": {
        "user-one": {
            "habit-one": {
                "name": "Reading",
                "description": "Read a book for at least 30 min in the morning",
                "frequency": [0,1,2,3,4]
            }
        }
    },
    "checkmarks": {
        "user-one": {
            "checkmark-id": {
                "habitId": "habit-one",
                "date": "2020-11-11",
                "value": "completed",
            }
        }
    },
    "users": {
        "user-one": {
            "locale": {
                "code": "en-GB"
            },
            "theme": {
                "primaryColor": "blue",
                "secondaryColor": "red",
                "dark": true
            },
            "performanceGoal": 80
        }
    }
}

```

### Authentication Layer

For quite some time I was using Private and Public routes to prevent an authenticated user from accessing the parts of the app available only for logged in user.
It was fine but I wanted to use a different layout for authenticated users (additional sidebar on the left).

I found the perfect solution in a [blog post by Kent C. Dodds](https://kentcdodds.com/blog/authentication-in-react-applications):

```jsx
function App() {
  const user = useUser();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
```

### Localization and language

I've never before implemented this in an app and I really wanted to give it a try. My main goal was to give the user an option to change their locale and language.
Although this goal was achieved, the solution is far from ideal. First of all, I think that it would be better to split these two layers. For example in YouTube one
can open settings and change either Language or Location.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

- npm start
- npm test
- npm run build
- npm run eject

For the detailed description of available scripts see [CRA Documentation](https://create-react-app.dev/docs/available-scripts)
