#!/bin/bash

cd modules/ram
make

echo "123456789" | sudo -S insmod ram.ko