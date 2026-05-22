FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config for SPA routing
RUN echo 'server { \
    listen 8080; \
    listen [::]:8080; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(?:css|js|mjs|png|jpg|jpeg|gif|svg|webp|avif|ico|woff2?)$ { \
        expires 30d; \
        add_header Cache-Control "public, max-age=2592000, immutable"; \
        try_files $uri =404; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copy built assets
COPY dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
