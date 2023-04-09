import matplotlib.pyplot as plt

# req_queue = list(map(int, input("Request queue: ").split(", ")))
# print(req_queue)
# head_pointer = int(input("Head pointer: "))

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


def draw(points, name):
    plt.figure(name, figsize=(4, 6))
    unit = 2
    max_y = unit * len(points)
    total_move = 0
    # draw arrows
    for i in range(0, len(points)-1):
        plt.arrow(points[i], max_y-i*unit, points[i+1]-points[i], -unit,
                  head_width=0.5, head_length=1, fc='k', ec='k')
        plt.text(points[i], max_y-i*unit + 0.8, points[i])
        total_move += abs(points[i+1]-points[i])
        plt.text(points[i], max_y-i*unit + 0.5, "move " +
                 str(abs(points[i+1]-points[i])), fontsize="xx-small")
    # show label for last point
    plt.text(points[len(points)-1], max_y-(len(points)-1)
             * unit + 0.5, points[len(points)-1])
    # show total movement
    plt.title("Total movement: " + str(total_move))


def FCFS(queue, head_pointer):
    points = [head_pointer]
    req_queue = list(queue)
    for req in req_queue:
        points.append(req)
    draw(points, "FCFS")


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
    draw(points, "SSTF")


def SCAN(queue, head_pointer):
    points = [head_pointer]
    req_queue = list(queue)
    req_queue.append(0)
    req_queue.sort()
    # find the biggest request smaller than head_pointer
    maxleft = find_max_smaller(req_queue, head_pointer)
    # go to the left-end
    for req_index in range(maxleft, -1, -1):
        points.append(req_queue[req_index])
        head_pointer = req_queue[req_index]
    # go to the rest of requests
    for req_index in range(maxleft, len(req_queue)):
        points.append(req_queue[req_index])
        head_pointer = req_queue[req_index]
    draw(points, "SCAN")


def CSCAN(queue, head_pointer):
    points = [head_pointer]
    req_queue = list(queue)
    req_queue.append(199)
    req_queue.append(0)
    req_queue.sort()
    # find the biggest request smaller than head_pointer
    maxleft = find_max_smaller(req_queue, head_pointer)
    # go to the right-end
    for req_index in range(maxleft+1, len(req_queue)):
        points.append(req_queue[req_index])
        head_pointer = req_queue[req_index]
    # go to the left-end
    for req_index in range(0, maxleft+1):
        points.append(req_queue[req_index])
        head_pointer = req_queue[req_index]
    draw(points, "C-SCAN")


def CLOOK(queue, head_pointer):
    points = [head_pointer]
    req_queue = list(queue)
    req_queue.append(199)
    req_queue.sort()
    # find the biggest request smaller than head_pointer
    maxleft = find_max_smaller(req_queue, head_pointer)
    # go to the right-end
    for req_index in range(maxleft+1, len(req_queue)):
        points.append(req_queue[req_index])
        head_pointer = req_queue[req_index]
    # go to the rest of requests
    for req_index in range(0, maxleft+1):
        points.append(req_queue[req_index])
        head_pointer = req_queue[req_index]
    draw(points, "C-LOOK")


def main():
    req_queue = [98, 183, 37, 122, 14, 124, 65, 67]
    head_pointer = 53

    FCFS(req_queue, head_pointer)

    SSTF(req_queue, head_pointer)

    SCAN(req_queue, head_pointer)

    CSCAN(req_queue, head_pointer)

    CLOOK(req_queue, head_pointer)

    plt.show()


if __name__ == "__main__":
    main()
