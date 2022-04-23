#!/bin/bash
rsync -avz ~/mnt/totems/dist/ mnt-sh:~/mnt/totems --delete --exclude=.git --exclude=up.sh
