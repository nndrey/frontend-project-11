### Hexlet tests and linter status:
[![Actions Status](https://github.com/nndrey/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nndrey/frontend-project-11/actions)


[![CI / CD Pipeline](https://github.com/nndrey/frontend-project-11/actions/workflows/deploy.yml/badge.svg)](https://github.com/nndrey/frontend-project-11/actions/workflows/deploy.yml)

# RSS Reader

A modern RSS aggregator built as part of the Hexlet frontend course. This service allows you to collect news from various sources into a single feed, track updates, and read articles in a convenient format.

## 🎯 Project Goals

This project is not just about building a working app, but about diving deep into the fundamental technologies of frontend development. We intentionally avoid high-level abstractions to master the basics:

-   **Vanilla DOM API:** Working with selectors, events, and dynamic HTML generation without frameworks.
-   **Architecture (MVC):** Splitting code into layers, managing state, and normalizing data. Designing logic without turning the code into "spaghetti".
-   **Asynchronous JavaScript (Ajax):** Making HTTP requests, handling errors, and understanding the async nature of JS using native Promises.
-   **Build Tools:** Setting up Vite, connecting dependencies, and automating the build process for production.
-   **UX and Forms:** Thoughtful user experience — disabling inputs during submission, progress indication, focus management, and data validation.

## 🛠 Tech Stack

-   **Language:** JavaScript (ESNext)
-   **Build Tool:** Vite
-   **Styling:** Bootstrap
-   **Network:** Ajax (Fetch API)
-   **Architecture:** MVC (implemented from scratch)
-   **Asynchronicity:** Native Promises

## ✅ Features

-   Adding RSS feeds by URL.
-   Automatic polling for new entries.
-   Aggregating all news into a single chronological feed.
-   Marking posts as read.
-   Viewing the full article text via the original link.
-   Handling all UI states: loading, success, network errors, and validation errors.

## 🚀 Deploy

The application is live and available online:

[![Deployed on Vercel](https://vercel.com/button)](https://frontend-project-11-5huu-git-main-andreys-projects-bed7bc2c.vercel.app)

*The source of truth is always the deployed version.*

## 🗺 Project Philosophy

> *"Code cleanliness and understanding the architecture are more important than using ready-made tools."*

This phrase perfectly captures the essence of the project. In modern development, it is easy to rely on framework magic and lose sight of what happens under the hood. 

We go deeper: we build our own MVC pattern from scratch. We don't just "use" Promises — we manage the asynchronous flow manually to truly understand how the event loop works. We handle form states and validation ourselves to feel the nuances of UX. This approach ensures that you won't just learn a specific library syntax, but will gain the engineering mindset required to build scalable and maintainable applications.

## 📋 Development Stages

The project is implemented iteratively. Each stage adds a new layer of functionality:

1.  **Foundation:** HTML markup, styles, and working with pure DOM.
2.  **Logic:** Implementing MVC and state management.
3.  **Network:** Loading and parsing RSS feeds via Ajax.
4.  **UX:** State handling and form validation.
5.  **Build:** Vite configuration and production deployment.

---

*Created with ❤️ at Hexlet. Code clarity and architectural understanding over ready-made tools.*