# ==============================================================================
# CampusCareer - Docker Container Configuration
# Base Image: Lightweight Nginx Alpine for serving static web applications
# ==============================================================================

FROM nginx:1.25-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static website assets into the Nginx web root directory
COPY . /usr/share/nginx/html/

# Remove Dockerfile and server configs from web root for security hygiene
RUN rm -f /usr/share/nginx/html/Dockerfile \
    && rm -f /usr/share/nginx/html/nginx.conf \
    && rm -f /usr/share/nginx/html/README.md

# Expose HTTP Port 80
EXPOSE 80

# Start Nginx web server in foreground mode
CMD ["nginx", "-g", "daemon off;"]
