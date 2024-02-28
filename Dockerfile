FROM nginx

COPY ./dist/ /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/react-demo.conf

EXPOSE 80
