for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do set ip=%%b
set ip=%ip:~1%

del /q "frontend/services/ip.js"
FOR /D %%p IN ("C:\Users\andre\Desktop\go-food-white\frontend\services\*.js*") DO rmdir "%%p" /s /q

(
echo const ip = '%ip%';
echo export default ip;
) > frontend\services\ip.js
exit