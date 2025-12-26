---
layout: blog
hidden: false
path: /my-precious
title: My Precious - Personal Finance Tracker
tags: Javascript
date: 2025-12-26T21:25:08.927Z
---
**My Precious** is a personal financial tracker developed to provide total control over your finances, combining the privacy of local storage with the convenience of cloud synchronization. This project was built focusing on performance, usability, and an "offline-first" experience.

## 🚀 Overview and Architecture

The project is a **Single Page Application (SPA)** built with **React** and **Vite**, utilizing a modern and robust architecture to ensure your data is always accessible, even without an internet connection.

### Core Technologies

* **Frontend**: React (Hooks, Context API), TailwindCSS, ShadCN UI.
* **Local Storage**: IndexedDB (via `idb`).
* **Backend/Cloud**: Firebase (Auth & Firestore).
* **Charts**: Recharts & Chart.js.

- - -

## ✨ Featured Features

### 1. Offline-First & Sync Engine

Unlike traditional apps that depend 100% on online APIs, My Precious uses **IndexedDB** as the local Single Source of Truth (SSOT).

* **How it works**: All read and write operations (creating transactions, editing accounts, etc.) happen immediately in the browser's local database. This ensures an instantaneous UI without blocking "loading" states.
* **Intelligent Synchronization**: A custom sync engine (`services/sync.ts`) runs in the background.

  * User actions are saved to an **action queue** (`action_queue`) within IndexedDB.
  * The system detects a connection and sends these changes to **Firebase Firestore** in batches.
  * **Deduplication/Compression**: If you edit the same item 10 times while offline, the system is smart enough to send only the final state, saving data and processing power.

### 2. Firebase Integration

Firebase acts as the backend for backup and cross-device synchronization.

* **Data Structure**: Each user has their own isolated collection in Firestore (`users/{uid}/...`), ensuring security and privacy.

### 3. Secure Authentication

Login is managed by **Firebase Authentication**, supporting:

* **Google Sign-In**: Quick one-click login.
* **Email/Password**: Traditional method.
* **Security**: Upon logging out, the local database (IndexedDB) is automatically cleared to ensure your data does not remain accessible on the device.

### 4. Currency Rates (Exchange Rates)

The system keeps the value of your international assets updated.

* **API**: Integration with `AwesomeAPI` to fetch real-time quotes (BRL base).
* **Historical Data**: The system can retrieve quotes from past dates to build accurate net worth evolution charts.
* **Resilience**: Implements **recursive fallback** logic; if a quote for a specific date does not exist (e.g., holidays or weekends), it automatically searches for the previous day, going back up to 7 days to ensure data consistency.

## 🗺️ Page Guide

### 📊 Dashboard

The command center for your finances.

* **Cash Flow & Charts**: Visualize cash flow (Income vs. Expenses) and various other interactive charts to understand your financial health.
* **Customizable Categories**: Create categories tailored to your reality, defining specific **colors** and **icons** for easy visual identification in charts.
* **Overview**: Cards showing Total Balance, Monthly Variation, and Asset Distribution.
* **Currency Rates**: Cards with the current value of the Dollar, Euro, Bitcoin, etc.

### 💳 Accounts

Detailed management of where your money is located.

* **Daily Snapshots**: The core philosophy here is creating "photographs" of your account balances over time. This allows for building a precise history of your wealth evolution, day by day.
* **Supported Types**: Checking accounts, Investments, Physical wallets, etc.
* **Reconciliation**: Tools to manually adjust balances if necessary.

### 📈 Projections

Long-term planning.

* **Simulations**: Visualize how your net worth should behave in the future based on your fixed expenses and expected income.
* **Goals**: Track progress toward your financial objectives.

### 💡 Insights

Your personal financial analyst.

* **Configurable Alerts**: The system monitors your spending and generates automatic alerts based on limits **you define**.

  * **Alert Types**: *Info* (general observations), *Good* (savings target reached), *Warning* (attention needed), and *Critical* (budget exceeded).
  * **Fully Customizable**: You configure the percentages, e.g., "Alert me if I spend 80% of the Leisure budget."
* **Smart Categorization**: See exactly where your money is going and identify spending trends.

### 📅 Calendar

Complete temporal control.

* **Statement Importer**: No more manual typing. The system features a smart importer (supporting C6 Bank, XP, etc.) that reads your statement (PDF/CSV) and automatically creates categorized transactions.
* **Recurring Transactions**: Register your fixed income and expenses (subscriptions, rent, salary) once, and the system projects future entries automatically.
* **Projected Values**: Create expenses with estimated values for the future and adjust them to the actual value when they occur, keeping your forecasts aligned with reality.
* **Monthly Summary**: Quickly visualize total planned income and expenses for the month.

## 🛠️ Installation and Execution

To run the project locally:

1. **Install dependencies**:

   ```
   npm install
   ```
2. **Configure the environment**: Create a `.env` file with your Firebase credentials.
3. **Run**:

   ```
   npm run dev
   ```

- - -
