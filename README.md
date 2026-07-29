# NEON TOURISM FZE Platform

Premium AI-powered travel platform for NEON TOURISM FZE in Dubai.

## What Is Included

- Luxury responsive website with dark and light modes
- Service pages/sections for visas, flights, hotels, holiday packages, city tours, desert safari, yachts, airport transfers, attraction tickets, customized tours, and corporate travel
- WhatsApp-style AI sales agent with greeting menu, service matching, knowledge-grounded answers, and human handoff fallback
- Lead capture with validation, duplicate-aware CRM updates, lead IDs, status, source, assigned owner, notes, and follow-up-ready records
- CRM search across customers, leads, destinations, services, notes, and bookings
- Kanban sales pipeline stages from New Lead through Completed and Lost
- Sales analytics dashboard with leads, conversion rate, pipeline revenue, lead sources, popular services, and admin controls
- Environment template, Dockerfile, and Prisma data model blueprint for production integration

## Production Integration Path

The current build runs as a polished, static-first application with browser-local CRM persistence so it can be previewed immediately. To connect live systems, wire the variables in `.env.example` into:

- OpenAI chat and embeddings for real RAG responses
- Supabase PostgreSQL with pgvector for crawled website, FAQ, package, policy, PDF, and uploaded document chunks
- WhatsApp Business Cloud API webhooks and interactive list/button templates
- Resend for customer and sales team email notifications
- Cloudinary or UploadThing for brochures, PDFs, package files, and attachments
- NextAuth with role-based access for Admin, Sales Manager, and Sales Executive

## Core Data Model

See `prisma/schema.prisma` for the production tables covering users, customers, leads, conversations, bookings, services, packages, knowledge documents, knowledge chunks, tasks, and audit events.
