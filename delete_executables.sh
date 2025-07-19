#!/bin/bash

# Change to the directory containing the executables
cd "/Users/apple/Documents/Project/Sudoko_Solver" || exit

# Loop through all executable files and delete them
for exe in *; do
    if [[ -x "$exe" && ! -d "$exe" ]]; then
        echo "Deleting $exe..."
        rm -f "$exe"  # Delete the executable
    fi
done 
