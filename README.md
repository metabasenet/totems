# HAH-BROWSER

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### browser install
``` bash
sudo apt install nginx
sudo cp hah.conf /etc/nginx/sites-available/hah
sudo ln -s /etc/nginx/sites-available/hah /etc/nginx/sites-enabled/hah
npm ci
npm run build
sudo ln -sfn $PWD/dist /var/www/hah
sudo service nginx restart
```

### browser uninstall
``` bash
sudo apt remove nginx nginx-common
sudo apt purge nginx nginx-common
```
