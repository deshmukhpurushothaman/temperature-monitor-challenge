# Temperature Dashboard

A real-time temperature dashboard built with React, Socket.io, and Tailwind CSS. The dashboard displays the current temperature along with its status (either "NORMAL" or "HIGH"). It also shows recent temperature readings with status updates and timestamps, using WebSocket for real-time data updates.

## Features

- **Real-time Temperature Data**: Displays the current temperature and status.
- **Connection Status**: Displays whether the application is connected or disconnected to the server.
- **Recent Readings**: A table showing recent temperature readings with their status and timestamps.
- **Responsive Design**: The UI adapts to different screen sizes.
- **Animations**: Smooth animations for UI components using `framer-motion`.

## Technologies Used

- **React**: For building the user interface.
- **Socket.io**: For real-time communication between the client and server.
- **Tailwind CSS**: For utility-first styling.
- **Framer Motion**: For smooth animations.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deshmukhpurushothaman/temperature-monitor-challenge.git
   ```

2. Navigate to the project folder:

   ```bash
   cd frontend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory of the project with the following variable:

   ```env
   NEXT_PUBLIC_API_URL=http://your-api-url
   ```

   Replace `http://your-api-url` with the actual URL of your backend server.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit the app in your browser:

   ```
   http://localhost:3000
   ```

## Usage

Once the app is running, it will automatically connect to the WebSocket server specified in the `.env` file. The dashboard will update in real time with the latest temperature readings.

- **Current Temperature**: Displays the current temperature along with its status ("NORMAL" or "HIGH").
- **Recent Readings**: A table that shows the latest 5 temperature readings, their status, and the timestamp of when they were received.
- **Connection Status**: Displays whether the app is currently connected to the server.

## Folder Structure

```
/app
    page.tsx    # Main dashboard component
.env               # Environment variables
README.md          # Project documentation
package.json       # Project dependencies and scripts
```

## Acknowledgements

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Socket.io](https://socket.io/) - A library for real-time web applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [Framer Motion](https://www.framer.com/motion/) - A library for animations in React.
