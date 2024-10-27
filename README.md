tructions, features, and customization options.

Event List Application
This project is a responsive web application that displays a list of events, with features for searching, sorting, filtering, and pagination. Users can view event details in a modal by clicking on any event card. The project is built with React and styled with CSS, making it adaptable across various screen sizes.

Table of Contents
Features
Technologies
Getting Started
Installation
Usage
Folder Structure
Customization
Contributing
License
Features
Search: Filter events by name or location with debounced input to reduce API calls.
Sort: Sort events by date or name.
Pagination: Navigate through event pages with "Previous" and "Next" buttons.
Responsive Design: Mobile-friendly layout adapts for all screen sizes.
Modal for Event Details: View detailed event information and images in a modal.
Loading Indicator: Displays a loading spinner while fetching data.
Technologies
React: Front-end JavaScript library for building user interfaces.
CSS: Custom styling for responsive and modern design.
Mock API: Fetches event data from MockAPI.io.
Getting Started
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/event-list-app.git
cd event-list-app
Install dependencies:
bash
Copy code
npm install
Usage
Start the application:
bash
Copy code
npm start
Open the app in your browser:
arduino
Copy code
http://localhost:3000
API Endpoint
The app fetches event data from a mock API:

URL: https://671e4c8b1dfc42991981da17.mockapi.io/api/v1/events
Modify the API URL in the EventList component if needed.

Folder Structure
csharp
Copy code
event-list-app/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   └── EventList.js          # Main Event List component
│   │── styles/
│   │   └── EventList.css         # CSS styles
│   └── App.js                    # Main App component
│   └── index.js                  # Entry point
├── README.md
Customization
Styling: Modify EventList.css to change styles for various components (search bar, event cards, modal, pagination controls, etc.).
Events Per Page: Change eventsPerPage in EventList.js to adjust the number of events shown on each page.
Loader Image: Update the loading spinner in the .loading-spinner class of EventList.css with a custom image or animation.
