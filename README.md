# PC coding challenge

## Table of Contents

- [Introduction](#introduction)
- [Approach](#approach)
- [Architecture](#architecture)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

## Introduction

This project is a web application where users can create, view, and interact with posts. The application is built with modern web technologies to provide a seamless and responsive user experience. Users can sign up, log in, create posts with text and images, view a feed of posts, and comment on posts. The app features infinite scrolling for a smooth browsing experience and real-time updates for new posts and comments.

## Approach

1. **Project Setup**: Created the Next.js and Supabase projects.
2. **Authentication**: Implemented user authentication using Supabase Auth API and GitHub OAuth.
3. **Database Schema**: Created database tables in Supabase with appropriate policies for security and data integrity.
4. **Post Listing**: Implemented functionality to list posts, displaying the most recent posts first.
5. **Post Creation**: Developed a feature allowing users to create posts with text and images.
6. **Comments**: Displayed comments on each post, showing user interactions.
7. **Comment Form**: Implemented a form for authenticated users to comment on posts with text and images.
8. **Pagination**: Added pagination using infinite scroll

## Architecture

### Frontend

The frontend of the application is built using [Next.js](https://nextjs.org/), a React framework that enables server-side rendering and static site generation. The key components and features include:

- **Components**: Reusable UI components are created using React and styled with Tailwind CSS.
- **State Management**: React hooks and context are used for state management across the application.

### Backend

The backend is powered by [Supabase](https://supabase.io/), an open-source Firebase alternative. It provides authentication, database, and storage services. Key backend functionalities include:

- **Authentication**: User authentication is handled using Supabase's auth service.
- **Database Operations**: CRUD operations are performed using Supabase's database service.

### Database

The database is managed by Supabase and is based on PostgreSQL. Key tables and their relationships include:

- **Users**: Stores user information and authentication details.
- **Posts**: Stores posts created by users, including text and image URLs.
- **Comments**: Stores comments on posts, linked to both users and posts.

## Setup and Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone git@github.com:mmoauro/PC-coding-challenge.git
   cd PC-coding-challenge
   ```

2. **Install dependencies**:

   ```bash
     yarn
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root of your project and add the following variables:

   ```env
   NEXT_PUBLIC_SUPABASE_PROJECT_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the development server**:

   ```bash
     yarn dev
   ```

5. Open the application: Open your browser and navigate to http://localhost:3000

## Usage

- **Creating a Post**: Users can create posts with text and images.
- **Viewing Posts**: Users can view a list of posts, with infinite scrolling.
- **Commenting**: Users can comment on posts if they are authenticated.
