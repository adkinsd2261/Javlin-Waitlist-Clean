# Javlin.ai Waitlist Landing Page

## Overview
This is a full-stack web application for Javlin.ai's waitlist landing page. The application features a premium, dark-themed design with a Next.js-style architecture using React, Express.js, and PostgreSQL for collecting waitlist signups for an AI co-founder platform powered by Javlin's proprietary Memory Engine.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Style**: RESTful endpoints
- **Middleware**: JSON parsing, CORS handling, request logging
- **Error Handling**: Centralized error middleware

### Data Storage
- **Database**: PostgreSQL (Replit-managed database)
- **ORM**: Drizzle ORM with type-safe queries
- **Schema Management**: Drizzle Kit for migrations
- **Validation**: Zod schemas for runtime type checking
- **Storage Layer**: DatabaseStorage implementation with full CRUD operations

## Key Components

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Waitlist Entries Table**: Email collection with source tracking and timestamps
- **Type Safety**: Full TypeScript integration with Drizzle-generated types

### API Endpoints
- `POST /api/waitlist`: Create waitlist entry with duplicate detection
- `GET /api/waitlist/stats`: Retrieve waitlist statistics and count

### UI Components
- **Landing Page**: Hero section with premium dark gradient design
- **Waitlist Form**: Email collection with validation and success states
- **Logo Component**: Reusable branding element
- **Toast System**: User feedback for form submissions

### Storage Abstraction
- **Interface Pattern**: IStorage interface for database operations
- **Memory Implementation**: In-memory storage for development/testing
- **Database Implementation**: PostgreSQL integration (ready for production)

## Data Flow

1. **User Interaction**: User visits landing page and enters email
2. **Form Validation**: Client-side validation using React Hook Form + Zod
3. **API Request**: Form submission triggers POST to `/api/waitlist`
4. **Server Processing**: Express server validates data and checks for duplicates
5. **Database Operation**: Drizzle ORM handles database insertion
6. **Response**: Success message with waitlist position returned to client
7. **UI Update**: Toast notification displays success/error state

## External Dependencies

### Core Runtime
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web server framework

### Frontend Libraries
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **framer-motion**: Animation library for smooth interactions
- **wouter**: Lightweight client-side routing

### UI Framework
- **@radix-ui/***: Accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library

### Development Tools
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Development**: `npm run dev` - runs TypeScript directly with hot reload
- **Production**: `npm run build && npm run start` - builds and serves optimized bundles
- **Database**: Requires `DATABASE_URL` environment variable

### Replit Integration
- **Autoscale Deployment**: Configured for production deployment
- **Port Configuration**: Server runs on port 5000, exposed as port 80
- **Module Dependencies**: Node.js 20, Web, PostgreSQL 16

## Recent Changes
- June 24, 2025: Completed comprehensive UI/UX audit and polish for premium client readiness
  - **User Journey Optimization**: Streamlined information hierarchy with clear problem → solution → tools → action flow
  - **Bloat Removal**: Eliminated expandable sections that created cognitive load; converted to clean, scannable layouts
  - **Enhanced "How Javlin Works"**: Redesigned to highlight core SaaS platform (Jav Assistant with Creative Mode & Dev Mode) emphasizing deep work and flow state benefits
  - **Visual Polish**: Added hover animations, glow effects, proper spacing, and premium color themes for each tool
  - **Magic Moment Story**: Created compelling narrative showing Memory Engine's depth - emotional journey, creative patterns, life lessons, and human understanding beyond simple bug fixes
  - **Streamlined Features**: Consolidated advanced features into digestible sections with clear value propositions
  - **Form Optimization**: Enhanced waitlist form with context-aware messaging and smooth success states
  - **Professional Hierarchy**: Improved section flow from hero → problems → solutions → tools → features → social proof → waitlist
  - **Consumer-Ready Polish**: Enterprise-level design quality matching Bolt/Replit standards
  - **Separate Pricing Page**: Created dedicated /pricing route for planned pricing information without purchase options

## Changelog
- June 24, 2025. Initial setup

## User Preferences
Preferred communication style: Simple, everyday language.