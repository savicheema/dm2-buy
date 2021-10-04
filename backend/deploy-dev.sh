echo "Deploying project on dev server"
git pull origin develop
npm install
pm2 restart server.js