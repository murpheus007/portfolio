FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Custom nginx config for SPA routing + RSS feed
COPY <<'NGINX' /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    listen [::]:8080;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        try_files $uri =404;
    }

    location ~* \.(?:css|js|mjs|png|jpg|jpeg|gif|svg|webp|avif|ico|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }

    # RSS feed — short cache so subscribers get updates
    location = /feed.xml {
        add_header Cache-Control "public, max-age=3600, must-revalidate";
        add_header Content-Type "application/rss+xml; charset=utf-8";
        try_files $uri =404;
    }
}
NGINX

# Copy built assets
COPY dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
