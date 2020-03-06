#!/bin/sh

#Define cleanup procedure
cleanup() {
    echo "Container stopped, performing cleanup..."
}

echo "Entrypoint script running"

#Trap SIGTERM
trap 'cleanup' TERM USR1 HUP INT QUIT 
#trap 'kill ${!}; cleanup' SIGTERM
#trap 'kill ${!}; cleanup' SIGUSR1

#Execute command
nodeos -e -p eosio --data-dir /data/data-dir --config-dir /var/config --disable-replay-opts >> nodeos.log 2>&1 &
sleep 100 &

#Wait
wait $!

#Cleanup
cleanup

# trap "echo 'TRAPed signal'" HUP INT QUIT TERM SIGTERM

# # start service in background here
# nodeos -e -p eosio --data-dir /data/data-dir --config-dir /var/config --disable-replay-opts >> nodeos.log 2>&1 &

# #echo "[hit enter key to exit] or run 'docker stop <container>'"
# #read
# sleep 10

# # stop service and clean up here
# #echo "stopping apache"
# #pkill nodeos

# echo "exited $0"