## install nginx

```bash
sudo apt-get install -y nginx
run ip, not wokring then htto open secirity
cd /etc/nginx/sites-available

sudo vim default

location /api {
 rewrite ^\/api\/(.*)$ /api/$1 break;
 proxy_pass  http://localhost:3055;
 proxy_set_header Host $host;
 proxy_set_header X-Real-IP $remote_addr;
 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}


sudo systemctl restart nginx
```
