# TodoListApp

`TodoListApp` is a React-based web application designed to help users manage their to-do lists effectively by grouping items and viewing their completion status. The application enables users to dynamically group their tasks and check the status of each item via an API.

### Deployed Link:
https://sita-coding.vercel.app/

## Features

- **Create Todo Groups**: Users can define groups to categorize their to-do items based on their preferences or priorities.
- **Delete Todo Groups**: Users have the flexibility to delete groups that are no longer needed.
- **Dynamic Todo Status Checking**: Fetches the completion status of to-do items from an API and displays it next to each group.

## Technology Stack

- **React**: Frontend library used for building the user interface.
- **Redux**: State management tool to manage the state across the app.
- **CSS**: For styling components.
- **Jest and React Testing Library**: Used for unit and integration testing.

## Validation Rules for Groups

When creating and managing groups, the following rules apply:

1. **Complete Coverage**: The entire range of 1 to 10 should be covered by the groups without any numbers missing.
2. **Range Limits**: No group can go outside the range of 1 to 10.
3. **No Gaps**: There should not be any gaps between consecutive groups.
4. **No Overlap**: There should not be overlap between consecutive groups.
5. **Flexibility in Grouping**: Users can make as many groups as they want as long as the above rules are valid.

### Examples of Valid and Invalid Group Data

- **Valid Groups**:
  - 1 - 5 and 6 - 10
  - 1 - 3 and 4 - 7 and 8 - 10
  - 1 - 10

- **Invalid Groups**:
  - 2 - 5 and 7 - 9 (The entire range of 1 - 10 is not covered)
  - 0 - 5 and 7 - 11 (Outside the range of 1 - 10)
  - 1 - 5 and 7 - 10 (Gaps between groups)
  - 1 - 5 and 3 - 10 (Overlap between groups)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installing

1. **Clone the repository**:

   ```bash
   https://github.com/codeswithadarsh/Sita-Coding.git
   cd TodoListApp

2. **Install dependencies**:

```bash
    npm install

3. **Run the application**:

```bash
npm start

This runs the app in development mode. Open http://localhost:3000 to view it in the browser.

