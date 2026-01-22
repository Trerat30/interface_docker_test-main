FROM nginx:alpine

# ลบ config default
RUN rm -rf /usr/share/nginx/html/*

# copy เว็บเราเข้า nginx
COPY . /usr/share/nginx/html

# expose port
EXPOSE 80