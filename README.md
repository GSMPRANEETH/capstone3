# Sportify - Sports News and Scores Dashboard

Sportify is a comprehensive Sports News and Scores Dashboard built using React that brings the excitement of sports right to your screen. This modern web application provides users with access to sports news articles and match scores across various sports, all in one convenient platform.

> **Note**: This is a demo application that fetches data from an API endpoint to showcase the application's capabilities. It does not display actual live sports data but rather demonstrates what the application can do with sample sports content.

Whether you're a casual fan or a sports enthusiast, Sportify keeps you informed about your favorite sports, teams, and matches. Stay up-to-date with the latest headlines, track scores, and never miss a moment of the action!

## 🌟 Key Features

### Core Functionality
- **Match Scores Display**: View match information and scores across multiple sports
- **Sports News Articles**: Read news articles and updates from the world of sports
- **Personalized Experience**: 
  - Customize your preferences by selecting your favorite sports and teams
  - Get personalized content based on your interests
  - Save and manage your favorite articles and matches
- **User Authentication**: Secure sign-up and sign-in functionality to save your preferences
- **User Profile Management**: Update user profile and change password functionality

### Modern Web Technologies
- **Progressive Web App (PWA)**: 
  - Install the app on your device for a native-like experience
  - Works offline with service worker caching
  - Fast loading and responsive performance
  - App manifest with custom icons and theme colors
- **Code Splitting & Lazy Loading**: 
  - Dynamic imports with React.lazy() for optimal bundle sizes
  - Route-based code splitting for faster initial page loads
  - Suspense boundaries for smooth loading experiences
- **TypeScript Integration**: 
  - Full TypeScript support for type safety and better developer experience
  - Strict type checking enabled
  - Enhanced code quality and maintainability

### UI/UX Features
- **Dark/Light Theme**: Toggle between dark and light modes with preference persistence
- **Responsive Design**: Seamlessly browse on any device - desktop, tablet, or mobile
- **Intuitive Interface**: Clean and modern UI built with React, Tailwind CSS, and Headless UI components
- **Error Boundaries**: Graceful error handling to prevent app crashes
- **Loading States**: Smooth loading indicators throughout the application

### Technical Features
- **State Management**: 
  - Context API for global state management
  - Separate contexts for Articles, Matches, Preferences, Theme, and Authentication
  - Reducer pattern for complex state updates
- **Form Validation**: React Hook Form for efficient form handling and validation
- **Local Storage**: Persist user preferences and authentication state
- **Path Aliases**: Clean import paths using TypeScript path mapping
- **API Integration**: RESTful API integration with proper error handling

## 📸 Screenshots

<!-- Add screenshots of your application here -->
<!-- Example: -->
<!-- ![Home Page](screenshots/home-page.png) -->
<!-- ![Live Matches](screenshots/matches.png) -->
<!-- ![News Articles](screenshots/articles.png) -->
<!-- ![User Preferences](screenshots/preferences.png) -->

<img width="1388" height="1039" alt="image" src="https://github.com/user-attachments/assets/6977638e-54a7-4605-9ba9-014111ea1b51" />
<img width="1317" height="1049" alt="image" src="https://github.com/user-attachments/assets/1c536b1b-ed8e-41e0-a0f4-ea15e2e090b7" />
<img width="1354" height="1042" alt="image" src="https://github.com/user-attachments/assets/a7133d86-df69-4db0-b9d1-4f48f4db80dd" />


## 🚀 Live Application

<!-- Add your deployed application URL here -->
<!-- Example: Visit the live application at: [https://your-app-url.com](https://your-app-url.com) -->

[*Hosted via Netlify! <img width="16" height="16" alt="netlify" src="https://github.com/user-attachments/assets/fdee9384-c678-4638-99df-d275635b35a9" />*](https://sportify-cp3.netlify.app/)

## 🎥 Video Demo

<!-- Add your video screencast link here -->
<!-- Example: Watch the demo video: [Sportify Demo on YouTube](https://youtube.com/your-video) -->

[*Check out the demo on YouTube <img width="16" height="16" alt="youtube" src="https://github.com/user-attachments/assets/d02cf18f-1c84-48e0-ae7f-3feca4185334" />*](https://youtu.be/ZXns_XshrJM)

## 🛠️ Built With

### Core Technologies
- **React 19** - Modern frontend framework with latest features
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Lightning-fast build tool and development server
- **React Router v7** - Client-side routing with lazy loading support

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Headless UI** - Unstyled, accessible UI components
- **Radix UI** - High-quality UI primitives (Tabs component)
- **Lucide React** - Beautiful, consistent icon library
- **Heroicons** - Additional icon set
- **Tailwind Merge** - Utility for merging Tailwind CSS classes
- **Class Variance Authority** - For managing component variants

### Features & Utilities
- **React Hook Form** - Performant form validation and management
- **Context API** - Global state management solution
- **Vite PWA Plugin** - Progressive Web App capabilities
- **Vite TSConfig Paths** - TypeScript path mapping support

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/GSMPRANEETH/capstone3.git
   cd capstone3/sportify
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📝 Usage

1. **Sign Up/Sign In**: Create an account or log in to access personalized features
2. **Set Your Preferences**: Choose your favorite sports and teams in the preferences section
3. **Browse Matches**: View match information and scores on the home page
4. **Read Articles**: Explore sports news articles and detailed content
5. **Manage Favorites**: Save your favorite articles and matches for quick access
6. **Customize Theme**: Toggle between light and dark modes for your preferred viewing experience
7. **Install as PWA**: Install the app on your device for quick access and offline capabilities

## 🎯 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting for reduced bundle sizes
- **Lazy Loading**: Components are loaded on-demand to improve initial load time
- **PWA Caching**: Service worker caching for faster repeat visits and offline support
- **Optimized Builds**: Production builds are minified and optimized with Vite
- **Suspense Boundaries**: Smooth loading states during component transitions

## 📦 Project Structure

The project follows a modular architecture with clear separation of concerns:

```
sportify/
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # Context providers for state management
│   │   ├── Articles/    # Articles state and actions
│   │   ├── Authentication/ # Auth state and actions
│   │   ├── Matches/     # Matches state and actions
│   │   ├── Preferences/ # User preferences
│   │   ├── Profile/     # User profile
│   │   ├── Sports/      # Sports data
│   │   ├── Teams/       # Teams data
│   │   └── Theme/       # Theme management
│   ├── views/           # Page components
│   ├── utils/           # Utility functions and constants
│   └── styles/          # Global styles
├── public/              # Static assets and PWA icons
└── vite.config.js       # Build configuration with PWA support
```

## 📄 License

This project is part of a capstone project.

## 👨‍💻 Author

GSMPRANEETH

---

*Built with ❤️ for sports enthusiasts everywhere!*
