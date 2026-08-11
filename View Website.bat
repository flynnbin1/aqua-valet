@echo off
rem Double-click to view the built Aqua Valet website (the dist/ folder).
rem Serves the real production files locally and opens your browser.
rem Close this window to stop viewing.
cd /d "%~dp0"
if not exist dist\index.html (
  echo No build found - running the build first...
  call npm run build
)
start "" http://localhost:4173
call npx vite preview --port 4173 --strictPort
