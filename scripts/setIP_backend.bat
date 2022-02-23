for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do set ip=%%b
set ip=%ip:~1%

del /q "backend/.env"
FOR /D %%p IN ("C:\Users\andre\Desktop\go-food-white\backend\*.env*") DO rmdir "%%p" /s /q

(
echo HOST=%ip%
echo PORT=3333
echo NODE_ENV=development
echo APP_NAME=AdonisJs
echo APP_URL=http://${HOST}:${PORT}
echo CACHE_VIEWS=true
echo APP_KEY=1EPZXy2jGbxr4RHrrkztg4xl3b9Nlyn6
echo DB_CONNECTION=pg
echo DB_HOST=127.0.0.1
echo DB_PORT=5432
echo DB_USER=postgres
echo DB_PASSWORD=admin
echo DB_DATABASE=go-food_db
echo HASH_DRIVER=bcrypt
) > backend\.env
exit