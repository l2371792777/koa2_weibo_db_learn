#!/bin/bash

echo -e "packages:"
read -a packages
if [ ${#packages[@]} == 0 ];then
    exit
fi
echo -e "npm i ${packages[@]} --registry=https://registry.npm.taobao.org"
npm i ${packages[@]} --registry=https://registry.npm.taobao.org