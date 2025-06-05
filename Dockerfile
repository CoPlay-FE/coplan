# 1단계: 모든 의존성 설치 (캐시용)
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci  

# 2단계: 소스 빌드
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .  
RUN npm run build  

# 3단계: 프로덕션 실행 환경
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# 프로덕션 의존성만 재설치
COPY package*.json ./
RUN npm ci --only=production

# 빌드 결과물만 복사
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./

EXPOSE 3000
CMD ["npm", "start"]