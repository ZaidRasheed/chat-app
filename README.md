# Chat App built with React and Typescript

## Tech Stack
- React.js 
- Firebase Authentication
- Firebase Firestore Database
- Firebase Realtime Database
- Firebase Storage

## Project overview

- #### Users
1. Users can create users accounts and also delete them.
2. Users can view their data and update some of it.
3. Users can add other users and send them messages.
4. Users have access to their chats. 
5. Users can update their password or request an email link if they forgot the password.

## Description and Approach 
- Users are created in the firestore database/users document and structured as follow: 
```
{
  firstName: string
  lastName:string
  email: string
  id: string
  profilePictureURL:string
  showOnlineStatus:boolean
}
  ```
- When a user is created a document in the firestore database/userChats document is created for all of his chats and is structured as map of all of the user chats with the chatId as the key:
```
chatID:{
    lastMessage:{
        date:serverTimestamp()
        message:string
    },
    unOpened:{
        count:number
    },
    userInfo:{
        firstName:string
        lastName:string
        profilePictureURL:string
        userId:string
    }
}
```
_ When the first message in a chat is sent a new chat document is created in the firestore database/chats document and is in the following form:
```
{
    active:boolean
    messages:[
        {
            content:string
            data:Timestamp()
            senderId:string
        }
    ]
}
```
- Requests are protected by firestore as follow:
  - Users can be created in the database only upon successfully creating an account.
  - A user can only read his own data and the data of his fiends (name,ID, profile picture).
  - A user can access only his chats.
  - A user can only delete his own account (where IDs match).

## Check the project live [here](https://zaidrasheed.github.io/admin-panel/)