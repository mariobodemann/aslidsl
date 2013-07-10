#!/bin/bash

for f in $(find images -type f | xargs ); do 
	echo "$f" >> image-list.txt; 
done;
