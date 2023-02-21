class Process {
    constructor(_name, _arrivalTime, _burstTime, _priority) {
        this.name = _name;
        this.arrivalTime = _arrivalTime;
        this.burstTime = _burstTime;
        this.priority = _priority;
        this.waitingTime = 0;
        this.turnAroundTime = 0;
        this.responseTime = 0;
    }
}

// Define the processes
const processes = [
    new Process("P1", 0, 4, 1),
    new Process("P2", 5, 3, 2),
    new Process("P3", 6, 5, 3),
    new Process("P4", 15, 4, 4)
];

const algorithms = {
    FCFS: "FCFS - First Come First Serve",
    SJF_N: "SJF - Shortest Job First (Non-preemptive)",
    SJF_P: "SJF - Shortest Job First (Preemptive)",
    PRI_N: "PRIORITY - Priority (Non-preemptive)",
    PRI_P: "PRIORITY - Priority (Preemptive)",
    RR: "Round Robin"
}

const selectedAlg = "FCFS";

let totalWaitingTime = 0;
let totalTurnAroundTime = 0;
let totalResponseTime = 0;
let throughput = 0;

const unit = 50; // width of a cell

// Calculate the start and end times for each process
let currentTime = 0;
//const timeline = [{process: processes[0], startTime: 1, endTime: 2},
//                  {process: processes[1], startTime: 3, endTime: 4},
//                  {process: processes[1], startTime: 5, endTime: 8},
//                  {process: processes[1], startTime: 8, endTime: 9},
//                  {process: processes[1], startTime: 10, endTime: 18}];
const timeline = [];

if (selectedAlg === "FCFS") {
    const heading = document.getElementById("algorithm");
    heading.innerHTML = algorithms.FCFS;

    for (let i = 0; i < processes.length; i++) {
        const process = processes[i];
        const startTime = currentTime >= process.arrivalTime ? currentTime : process.arrivalTime;
        const endTime = startTime + process.burstTime;

        // Calculate waiting time
        process.waitingTime = startTime - process.arrivalTime;
        totalWaitingTime += process.waitingTime;

        // Calculate turn around time
        process.turnAroundTime = endTime - process.arrivalTime;
        totalTurnAroundTime += process.turnAroundTime;

        // Calculate response time
        process.responseTime = startTime - process.arrivalTime;
        totalResponseTime += process.responseTime;

        timeline.push({ process: process, startTime: startTime, endTime: endTime });

        currentTime = endTime;
    }

    // Draw the timeline
    const drawTimeLine = document.getElementById("timeline");

    for (let i = 1; i <= currentTime; i++) {
        const div = document.createElement("div");
        div.className = "milestone";
        div.innerHTML = i;
        div.style.width = `${unit}px`;
        drawTimeLine.appendChild(div);
    }

    // Draw the Gantt chart
    const ganttChart = document.getElementById("gantt-chart");
    let gainCell = 0; // pill for flexbox's effect
    for (let i = 0; i < timeline.length; i++) {
        const entry = timeline[i];
        const process = entry.process;
        const startTime = entry.startTime - gainCell;
        const endTime = entry.endTime - gainCell;
        const width = (endTime - startTime) * unit;
        const left = startTime * unit;
        const color = `hsl(${i * unit}, 80%, 65%)`;
        const div = document.createElement("div");

        gainCell += endTime - startTime;

        div.className = "process";
        div.style.width = `${width}px`;
        div.style.left = `${left}px`;
        div.style.background = color;
        div.dataset.name = process.name;
        ganttChart.appendChild(div);
    }

    console.log(timeline);

    // Calculate throughput
    throughput = (processes.length / currentTime).toFixed(2);
    const throughputElement = document.getElementById("throughput-value");
    throughputElement.innerHTML = throughput;

    const averageWaitingTime = document.getElementById("avg-waiting-time-value");
    averageWaitingTime.innerHTML = (totalWaitingTime / processes.length).toFixed(2);

    const averageTurnAroundTime = document.getElementById("avg-turnaround-time-value");
    averageTurnAroundTime.innerHTML = (totalTurnAroundTime / processes.length).toFixed(2);

    const averageResponseTime = document.getElementById("avg-response-time-value");
    averageResponseTime.innerHTML = (totalResponseTime / processes.length).toFixed(2);

    // Print the processes
    const processList = document.getElementById("given-processes");
    processList.innerHTML += processes.map(
        (process) => `<tr>
        <td>${process.name}</td>
        <td>${process.arrivalTime}</td>
        <td>${process.burstTime}</td>
        <td>${process.priority}</td>
        <td>${process.waitingTime}</td>
        <td>${process.turnAroundTime}</td>
        <td>${process.responseTime}</td>
        </tr>`).join("\n");
}