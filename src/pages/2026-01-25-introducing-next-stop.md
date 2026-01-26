---
layout: blog
hidden: false
path: /introducing-next-stop-travel-planner
title: "Next Stop: The Travel Planner That Actually Makes Sense"
topic: "Projects"
tags: Javascript
date: 2026-01-25T14:30:00.000Z
---
Hey everyone! 👋 Today I want to introduce a project I’ve been pouring a lot of energy into: **Next Stop**.

If you’re anything like me, planning a trip usually involves 50 open browser tabs, a messy Google Sheet, and a random collection of saved locations on Google Maps. It works... until it doesn't. You lose track of which restaurant is near which museum, or you accidentally schedule a dinner on the other side of the city.

**Next Stop** was built to solve exactly that. It combines the structure of a Kanban board with the spatial awareness of an interactive map.

Here is a look at why I built it and the features that make it special.

### 1. Itinerary as a Kanban Board 📋

The core of the application is the **Board View**. Instead of "To Do" and "Done," your columns are the days of your trip.

*   **Drag & Drop**: Changed your mind? Just drag that "Louvre Museum" card from Monday to Tuesday.
*   **Visual Organization**: See your entire trip flow at a glance.
*   **Detailed Cards**: Add costs (in multiple currencies!), checklists, notes, and specific times to every activity.

### 2. The "Context-Aware" Map 🗺️

This is the killer feature. Most travel apps show you a map of *everything* or a list of *everything*. Next Stop links them together.

*   **Daily Routes**: When you view the map, it visualizes your route day-by-day. Monday is Blue, Tuesday is Green. You can instantly see if your itinerary makes geographical sense.
*   **Dashboard Filtering**: Planning a multi-city trip (e.g., London -> Paris)? Each city gets its own Dashboard. Clicking on "Paris" filters the map to show only your Parisian adventures.
*   **Interactive Markers**: Click a marker on the map to see the card details without leaving the view.

### 3. Accommodation Support 🛏️

Whether it's a hotel, an Airbnb, or a friend's couch, you can set your accommodation for each city dashboard.

It gets its own special marker on the map, helping you anchor your daily activities around where you sleep. We integrated Google Places API so you can search for "Starbucks" or specific addresses instantly.

### 4. Real-Time Collaboration 🤝

Trips are rarely solo endeavors. Next Stop uses **Firebase** under the hood, which means:
*   **Live Sync**: Changes happen instantly for everyone on the trip.
*   **Permissions**: Share trips with friends with 'View' or 'Edit' access. No more "Wait, did you update the doc?" conversations.

### 5. PDF Export for the Offline Moments 📄

We all know data roaming can be spotty. With one click, you can generate a clean, formatted PDF of your entire itinerary—grouped by city and day—ready to be printed or saved to your phone.

- - -

### 🛠️ Under the Hood

For the devs out there, Next Stop is built with a modern stack focusing on performance and UX:
*   **Frontend**: React + TypeScript (Vite)
*   **UI**: Tailwind CSS + Shadcn/ui
*   **Maps**: MapLibre GL
*   **Drag & Drop**: @dnd-kit/core
*   **State**: TanStack Query

I'm really excited about where this is heading. If you're tired of spreadsheets and want a tool that actually understands how travel works, give **Next Stop** a try.

You can try it out right now at: **[https://next-stop-planner.netlify.app/](https://next-stop-planner.netlify.app/login)**. It's easy to get started—create an account with your email or just sign in with Google.

Safe travels! ✈️
