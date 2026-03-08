FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["npm", "run", "test:docker"]
