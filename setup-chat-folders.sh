#!/bin/bash
# AI Chat Assistant — Folder Structure Setup
# Run from project root: bash setup-chat-folders.sh

echo "🤖 Creating AI Chat Assistant folder structure..."

# Data layer
mkdir -p data/scripts

# Library files
# src/lib/ already exists

# API route
mkdir -p src/app/api/chat

# Chat widget component
mkdir -p src/components/chat

echo "✅ Folders created:"
echo "  data/"
echo "  data/scripts/"
echo "  src/app/api/chat/"
echo "  src/components/chat/"
echo ""
echo "📋 Next: Copy these files into the folders:"
echo "  1. data/chunks.ts"
echo "  2. data/scripts/generate-embeddings.ts"
echo "  3. src/lib/rag.ts"
echo "  4. src/lib/chat-context.ts"
echo "  5. src/lib/chat-leads.ts"
echo "  6. src/app/api/chat/route.ts"
echo "  7. src/components/chat/ChatWidget.tsx"
echo "  8. src/components/chat/ChatWidget.module.css"
echo ""
echo "Then run: npx tsx data/scripts/generate-embeddings.ts"
echo "Then add <ChatWidget /> to src/app/[locale]/layout.tsx"