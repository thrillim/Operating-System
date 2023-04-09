import matplotlib.pyplot as plt

# req_queue = list(map(int, input("Request queue: ").split(", ")))
# print(req_queue)
# head_pointer = int(input("Head pointer: "))

req_queue = [98, 183, 37, 122, 14, 124, 65, 67]
head_pointer = 53
total_move = 0

unit = 2
max_y = unit * len(req_queue)
points = [head_pointer]


algo = input(
    "Scheduling algorithm:\n1 - FCFS \n2 - SSTF\n3 - SCAN \n4 - C-SCAN\n5 - C-LOOK\nYour choice: ")
if algo == "1" or algo == "FCFS":
    for req in req_queue:
        points.append(req)
        total_move += abs(req - head_pointer)
if algo == "2" or algo == "SSTF":
    # find the closest request
    while len(req_queue) > 0:
        min_dist = abs(req_queue[0] - head_pointer)
        min_index = 0
        for i in range(1, len(req_queue)):
            if abs(req_queue[i] - head_pointer) < min_dist:
                min_dist = abs(req_queue[i] - head_pointer)
                min_index = i
        points.append(req_queue[min_index])
        total_move += abs(req_queue[min_index] - head_pointer)
        head_pointer = req_queue[min_index]
        req_queue.pop(min_index)
if algo == "3" or algo == "SCAN":  # go to left-end then max-request
    req_queue.append(0)
    req_queue.sort()
    # go to left-end
    # find the biggest request smaller than head_pointer
    maxleft = 0
    while (req_queue[maxleft] < head_pointer):
        maxleft += 1
    # go to the left-end
    for req_index in range(maxleft-1, -1, -1):
        points.append(req_queue[req_index])
        total_move += abs(req_queue[req_index] - head_pointer)
        head_pointer = req_queue[req_index]
    # go to the rest of requests
    for req_index in range(maxleft, len(req_queue)):
        points.append(req_queue[req_index])
        total_move += abs(req_queue[req_index] - head_pointer)
        head_pointer = req_queue[req_index]
if algo == "4" or algo == "C-SCAN":  # go to right-end then left-end then the rest
    req_queue.append(199)
    req_queue.append(0)
    req_queue.sort()
    # find the biggest request smaller than head_pointer
    maxleft = 0
    while (req_queue[maxleft] < head_pointer):
        maxleft += 1
    # go to the right-end
    for req_index in range(maxleft, len(req_queue)):
        points.append(req_queue[req_index])
        total_move += abs(req_queue[req_index] - head_pointer)
        head_pointer = req_queue[req_index]
    # go to the left-end
    for req_index in range(0, maxleft):
        points.append(req_queue[req_index])
        total_move += abs(req_queue[req_index] - head_pointer)
        head_pointer = req_queue[req_index]
if algo == "5" or algo == "C-LOOK":  # go to right-max then left-max then the rest
    req_queue.sort()
    # find the biggest request smaller than head_pointer
    maxleft = 0
    while (req_queue[maxleft] < head_pointer):
        maxleft += 1
    # go to the right-end
    for req_index in range(maxleft, len(req_queue)):
        points.append(req_queue[req_index])
        total_move += abs(req_queue[req_index] - head_pointer)
        head_pointer = req_queue[req_index]
    # go to the left-end
    for req_index in range(0, maxleft):
        points.append(req_queue[req_index])
        total_move += abs(req_queue[req_index] - head_pointer)
        head_pointer = req_queue[req_index]

# draw arrows
for i in range(0, len(points)-1):
    plt.arrow(points[i], max_y-i*unit, points[i+1]-points[i], -unit,
              head_width=0.5, head_length=1, fc='k', ec='k')
    plt.text(points[i], max_y-i*unit + 0.8, points[i])
    plt.text(points[i], max_y-i*unit + 0.5, "move " +
             str(abs(points[i+1]-points[i])), fontsize="xx-small")

# show label for last point
plt.text(points[len(points)-1], max_y-(len(points)-1)
         * unit + 0.5, points[len(points)-1])
# show total movement
plt.title("Total movement: " + str(total_move))

plt.show()
