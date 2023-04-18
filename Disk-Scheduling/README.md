# Disk Scheduling Algorithms in Python #
This project implements five disk scheduling algorithms: FCFS, SSTF, SCAN, C-SCAN, and C-LOOK in Python.

## Requirements ##
* Python 3
* matplotlib.pyplot

## Usage ##
1. Clone or download the whole project or just this folder.
2. Install required library: `pip3 install matplotlib.pyplot`
3. Navigate to the project directory in the terminal.
4. Run the main.py file with Python 3: `python3 try.py`
5. The program will then display the results for all five disk scheduling algorithms.

Note: Now code is now work with given group of inputs (see line from 171 to 187). You can modify source code to get input from user (sample input promt from line 164 to 169)

## Algorithms ##
### FCFS (First-Come, First-Served) ###
This is the simplest disk scheduling algorithm, in which the disk head moves through the disk requests in the order they are received.

### SSTF (Shortest Seek Time First) ###
This algorithm chooses the disk request with the shortest seek time from the current position of the disk head.

### SCAN ###
The disk arm starts at one end of the disk, and moves toward the other end, servicing requests until it gets to the other end of the disk, where the head movement is reversed and servicing continues.

SCAN algorithm Sometimes called the elevator algorithm.

### C-SCAN (Circular SCAN) ###
The head moves from one end of the disk to the other, servicing requests as it goes.

When it reaches the other end, however, it immediately returns to the beginning of the disk, without servicing any requests on the return trip

Treats the cylinders as a circular list that wraps around from the last cylinder to the first one

### C-LOOK (Circular LOOK) ###
This algorithm is similar to C-SCAN, but instead of moving to the beginning or end of the disk when there are no more requests in the current direction, the disk head jumps to the opposite end of the disk.

## Contributing ##
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License ##
This project is licensed under the MIT License.