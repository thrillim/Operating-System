import matplotlib.pyplot as plt


# find the max request that smaller than head_pointer using binary search
def find_max_smaller(req_queue, head_pointer):
    left = 0
    right = len(req_queue) - 1
    while left <= right:
        mid = (left + right) // 2
        if req_queue[mid] == head_pointer:
            return mid - 1
        elif req_queue[mid] < head_pointer:
            left = mid + 1
        else:
            right = mid - 1
    return right


def draw(points, name, maxDist):
    plt.figure(name, figsize=(4, 6))
    unit = 2
    max_y = unit * len(points)
    total_move = 0
    # draw arrows
    for i in range(0, len(points)-1):
        plt.arrow(points[i], max_y-i*unit, points[i+1]-points[i], -unit,
                  head_width=0.5, head_length=1, fc='k', ec='k')
        plt.text(points[i], max_y-i*unit + 0.8, points[i])
        small_move = abs(points[i+1]-points[i])
        if (maxDist != 0):
            if small_move == maxDist:
                small_move = 0
        total_move += small_move
        plt.text(points[i], max_y-i*unit + 0.5, "move " +
                 str(small_move), fontsize="xx-small")
    # show label for last point
    plt.text(points[len(points)-1], max_y-(len(points)-1)
             * unit + 0.5, points[len(points)-1])
    # show total movement
    plt.title("Total movements: " + str(total_move))


def FCFS(queue, head_pointer):
    points = [head_pointer]
    req_queue = list(queue)
    for req in req_queue:
        points.append(req)
    draw(points, "FCFS", 0)


def SSTF(queue, head_pointer):
    points = [head_pointer]
    req_queue = list(queue)
    # find the closest request
    while len(req_queue) > 0:
        min_dist = abs(req_queue[0] - head_pointer)
        min_index = 0
        for i in range(1, len(req_queue)):
            if abs(req_queue[i] - head_pointer) < min_dist:
                min_dist = abs(req_queue[i] - head_pointer)
                min_index = i
        points.append(req_queue[min_index])
        head_pointer = req_queue[min_index]
        req_queue.pop(min_index)
    draw(points, "SSTF", 0)


def SCAN(queue, head_pointer, min_track, max_track, toRight):
    points = [head_pointer]
    req_queue = list(queue)
    if (toRight):
        if (head_pointer < max_track and max_track not in req_queue):
            req_queue.append(max_track)
        req_queue.sort()
        # find the biggest request smaller than head_pointer
        maxleft = find_max_smaller(req_queue, head_pointer)
        # go to the right-end
        for req_index in range(maxleft+1, len(req_queue)):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
        # go to the rest of requests
        for req_index in range(maxleft, -1, -1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
    else:
        if (head_pointer > min_track and min_track not in req_queue):
            req_queue.append(min_track)
        req_queue.sort()
        # find the biggest request smaller than head_pointer
        maxleft = find_max_smaller(req_queue, head_pointer)
        # go to the left-end
        for req_index in range(maxleft, -1, -1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
        # go to the rest of requests
        for req_index in range(maxleft+1, len(req_queue)):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
    draw(points, "SCAN", max_track-min_track)


def CSCAN(queue, head_pointer, min_track, max_track, toRight):
    points = [head_pointer]
    req_queue = list(queue)
    # if max_track is not in the queue, add it
    if (max_track not in req_queue and head_pointer < max_track):
        req_queue.append(max_track)
    # if min_track is not in the queue, add it
    if (min_track not in req_queue and head_pointer > min_track):
        req_queue.append(min_track)
    req_queue.sort()
    # find the biggest request smaller than head_pointer
    maxleft = find_max_smaller(req_queue, head_pointer)
    if (toRight):
        # go to the right-end
        for req_index in range(maxleft+1, len(req_queue)):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
        # go to the left-end
        for req_index in range(0, maxleft+1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
    else:
        # go to the left-end
        for req_index in range(maxleft, -1, -1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
        # go to the right-end
        for req_index in range(len(req_queue)-1, maxleft, -1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
    draw(points, "C-SCAN", max_track-min_track)


def CLOOK(queue, head_pointer, toRight):
    points = [head_pointer]
    req_queue = list(queue)
    req_queue.sort()
    maxDist = req_queue[len(req_queue)-1] - req_queue[0]
    # find the biggest request smaller than head_pointer
    maxleft = find_max_smaller(req_queue, head_pointer)
    if (toRight):
        # go to the right-end
        for req_index in range(maxleft+1, len(req_queue)):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
        # go to the rest of requests
        for req_index in range(0, maxleft+1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
    else:
        # go to the left-end
        for req_index in range(maxleft, -1, -1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
        # go to the rest of requests
        for req_index in range(len(req_queue)-1, maxleft, -1):
            points.append(req_queue[req_index])
            head_pointer = req_queue[req_index]
    draw(points, "C-LOOK", maxDist)


def main():
    # req_queue = list(map(int, input("Request queue: ").split(", ")))
    # print(req_queue)
    # head_pointer = int(input("Head pointer: "))
    # prev_head_pointer = int(input("Previous position of pointer: "))
    # max_track = int(input("Max track: "))
    # min_track = int(input("Min track: "))

    # req_queue = [98, 183, 37, 122, 14, 124, 65, 67]
    # prev_head_pointer = 53
    # head_pointer = 53
    # max_track = 199
    # min_track = 0

    # req_queue = [2069, 1212, 2296, 2800, 544, 1618, 356, 1523, 4965, 3681]
    # prev_head_pointer = 1805
    # head_pointer = 2150
    # max_track = 4999
    # min_track = 0

    req_queue = [55, 58, 39, 18, 90, 160, 150, 38, 184]
    prev_head_pointer = 100
    head_pointer = 100
    max_track = 199
    min_track = 0

    toRight = (prev_head_pointer <= head_pointer)
    print("toRight: ", toRight)

    FCFS(req_queue, head_pointer)

    SSTF(req_queue, head_pointer)

    SCAN(req_queue, head_pointer, min_track, max_track, toRight)

    CSCAN(req_queue, head_pointer, min_track, max_track, toRight)

    CLOOK(req_queue, head_pointer, toRight)

    plt.show()


if __name__ == "__main__":
    main()
