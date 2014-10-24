@echo off

title kiss-search / build
echo ################################
echo # Build du projet kiss-search  #
echo ################################

C:
cd %~dp0
grunt build
pause

