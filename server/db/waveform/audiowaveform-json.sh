#!/bin/bash

for i in {1..100}

do
audiowaveform -i $i.mp3 -o $i.json --pixels-per-second 1 --bits 8 | audiowaveform -i $i.dat -o $i.json
done