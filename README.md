# Chat App built with React and Typescript

## Tech Stack
- React
- TypeScript
- Firebase (Authentication, Firestore Database, Realtime Database, Storage)
- Tailwind for the UI

## Project overview

- ### Users
1. Users can create users accounts and also delete them.
2. Users can view their data and update some of it.
3. Users can add other users and send them messages.
4. Users can update their password or request an email link if they forgot the password.
5. Users have the choice to show or hide their online status, and once they log out or close the window they become offline.
6. All data is real time.

## Description and Approach 
- ### When a user signs up:
    - Users are created in the database/users collection and structured as follow: 

    ```
    {
        firstName: string
        lastName:string
        email: string
        id: string
        profilePictureURL: string
        showOnlineStatus: boolean
    }
    ```
    - An empty document of userChats collection is created for him under with his user ID.
- ### When a user is added
    - Chat document is created in the database/chats collection with the combined ID of both users with the following structure:
    ```
    {
        active: boolean,
        user1: string,
        user2: string,
        messages: []
    }
    ```
    - For each chat created two corresponding userChats objects with the chatId are created for each user in the database/userChats collection under each user's ID document and are structured as follow:
    ```
    {
        chatId:{
            lastMessage: {},
            unOpened: {
                count: 0
            },
            userInfo: {
                firstName: string
                lastName: string
                profilePictureURL: string
                userId: string
            }
        },
    }
    ```
- ### When a message is sent
    - The chat document and both user's userChats documents need to be updated and is done as follow:
        - for the chat document the message is added to the messages array:
        ```
        {
            active: boolean,
            user1: string,
            user2: string,
            messages: [
                {
                    content: string
                    data: Timestamp()
                    senderId: string
                }
            ]
        }
        ```
        - For the userChats documents:
        ```
        {
            chatId: {
                lastMessage: {
                    date: Timestamp()
                    message: string
                },
                unOpened: {
                    count: number
                },
                userInfo:{
                    firstName: string
                    lastName: string
                    profilePictureURL: string
                    userId: string
                }
            },
        }
        ```
- ### When a user opens a chat
    - The user will set the unOpened messages count in his userChats document>chatID.unOpened back to 0:
        ```
        {
            chatId: {
                ...unOpened: {
                    count: 0
                }
            },
        }
        ```
- ### Managing online presence 
    - If the user has his showOnlineStatus on (true) then when he logs in his online status in the Realtime database in the connections path is set to true where all of his other chats are listening.
    - A connection with the special `.info/connected` path in Realtime Database is made. This path returns `true` when connected and `false` when disconnected so when the user closes the window he becomes offline.
    - When the user signs out a request is sent to update the his status to offline.
### Requests are protected in the Realtime database as follow: 
- Only authenticated users can read data.
- A user can only update his own data and it must be a boolean (either true== online or false==offline)
```
{
  "rules": {
    ".read": "auth != null",
    "connections":{
      "$uid": {
        ".write": "auth != null && auth.uid == $uid",
        ".validate": "newData.child('connected').isBoolean()"
      }
    }
  }
}
```

### Requests are protected by firestore as follow:
  - Users can be created in the database only upon successfully creating an account.
  - A user can read his own data and the data other users from the users document.
  - A user can only update his data.
  - A user can only delete his account.
  - Any user can create, read and update a userChats document (not chat).
  - A user can only delete his userChats document.
  - A user can only read his chats.
  - A user can create a chat with any other user (if they have their ID).
  - Only the chat and receiver can send messages to each other.
  - Chats stay even if users delete their accounts.

```  
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
    	allow read: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid));

			allow create:if request.auth != null && request.auth.uid == userId
      	&& request.resource.data.firstName is string
        && request.resource.data.lastName is string
        && request.resource.data.userId is string
        && request.resource.data.email is string
        && request.resource.data.showOnlineStatus is bool;
        
      allow delete: if request.auth != null && request.auth.uid == userId;
      
      allow update: if request.auth != null
      	&& request.auth.uid == userId
      	&& (request.resource.data.email == resource.data.email)
      	&& (request.resource.data.userId == resource.data.userId)
        && request.resource.data.showOnlineStatus is bool
        && request.resource.data.firstName is string
        && request.resource.data.lastName is string;
    }
    match /userChats/{userId}{
    	allow read,create: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid));
    	
      allow update: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid));
        // && request.resource.data.chatId.userInfo.userId is string;
        // && request.resource.data.userInfo.firstName is string
        // && request.resource.data.userInfo.lastName is string
        // && request.resource.data.unOpened.count is number
        // && request.resource.data.lastMessage.date is timestamp
        // && request.resource.data.lastMessage.message is string;

      allow delete: if request.auth != null && request.auth.uid == userId;
    }
    
    match /chats/{chatId}{
    	allow read: if request.auth != null && (resource.data.user1 == request.auth.uid || resource.data.user2 == request.auth.uid);      
    	
      allow create: if request.auth != null && exists(/databases/$(database)/documents/users/$(request.auth.uid))
      	&& request.resource.data.messages is list
        && request.resource.data.messages.size() ==0
        && request.resource.data.active is bool
        && request.resource.data.active == true
        && request.resource.data.user1 is string
        && request.resource.data.user2 is string
        && (request.resource.data.user1 == request.auth.uid || request.resource.data.user2 == request.auth.uid);
        
			
      allow update: if (request.auth != null && (resource.data.user1 == request.auth.uid || resource.data.user2 == request.auth.uid))
      	&& request.resource.data.messages is list
        && request.resource.data.messages[request.resource.data.messages.size()-1].content is string 
        && request.resource.data.messages[request.resource.data.messages.size()-1].date is timestamp
        && request.resource.data.messages[request.resource.data.messages.size()-1].senderId is string;
      
      allow delete: if false;
    }
  }
}
  ```



## Check the project live [here](https://zaidrasheed.github.io/chat-app/)