FROM node:22-slim AS  base

ARG  PORT=3000

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app


FROM base AS dependencies

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Public build-time environment variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
ARG STRIPE_SECRET_KEY
#
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=$NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY


RUN npm run build

FROM base AS run

ENV NODE_ENV=production
ENV PORT=$PORT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 101 nextjs
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE $PORT

ENV HOSTNAME="0.0.0.0"
CMD ["node","server.js"]