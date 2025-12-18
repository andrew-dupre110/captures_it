# Front-end-template

Front-end template using Next.js and following a particular folder structure for clean architecture.

## Getting Started

To start the project locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# The app will be available at http://localhost:3000
```

## Folder Structure

This template follows a clean architecture approach. The main folders are:

- `app/` - Main application code, including pages, layouts, and routing.
- `components/` - Reusable UI components shared across the app.
- `lib/` - Shared library functions and third-party integrations.
- `hooks/` - Custom React hooks for encapsulating logic.
- `styles/` - Global and component-specific stylesheets.
- `public/` - Static assets such as images and fonts.
- `utils/` - Utility/helper functions used throughout the project.
- `types/` - TypeScript interfaces, types, and enums for type safety.
- `services/` - Handles API calls and external service integrations.

## Libraries Used

- **Next.js** - React framework for server-side rendering and static site generation.
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development.
- **shadcn/ui** - Component library built on top of Radix UI and Tailwind CSS.
- **Clerk** - Authentication and user management.

## Notes

- This project uses both shadcn/ui and Tailwind CSS for building modern, accessible UIs.
- Clerk is integrated for authentication and user management.
- **To use Clerk, you must create a project on [Clerk](https://clerk.com/), then add the required Clerk configuration variables to your `.env` file.** Refer to the Clerk documentation for the necessary environment variables and setup instructions.

Feel free to customize this template to fit your project's needs!
