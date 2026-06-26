# FoxyseLabs

AI Chat Assistant - Your intelligent chatbot/agent powered by multiple AI providers.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Prisma 7 + SQLite (dev) / PostgreSQL (prod)
- **Auth**: NextAuth.js v4
- **AI**: Vercel AI SDK (multi-provider: OpenAI, Anthropic)
- **State**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd FoxyseLabs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Initialize the database:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application.

## Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# AI Providers (at least one required)
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
```

## Features

- 🔐 User authentication (login/register)
- 💬 Real-time chat with streaming responses
- 📝 Markdown rendering with syntax highlighting
- 🗂️ Conversation history management
- 📱 Responsive design (mobile + desktop)
- 🤖 Multi-provider AI support (OpenAI, Anthropic)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── (auth)/       # Authentication pages
│   ├── (chat)/       # Chat pages
│   └── api/          # API routes
├── components/       # React components
│   ├── auth/         # Auth forms
│   ├── chat/         # Chat UI components
│   └── ui/           # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
│   ├── ai/           # AI provider config
│   ├── auth.ts       # NextAuth config
│   └── db.ts         # Prisma client
└── types/            # TypeScript types
```

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

## License

MIT
