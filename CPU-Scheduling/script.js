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

const unit = 50; // width of a cell

const algorithms = {
    FCFS: "FCFS - First Come First Serve",
    SJF_N: "SJF - Shortest Job First (Non-preemptive)",
    SJF_P: "SJF - Shortest Job First (Preemptive)",
    PRI_N: "Priority (Non-preemptive)",
    PRI_P: "Priority (Preemptive)",
    RR: "Round Robin"
}

const selectedAlg = "FCFS";
const heading = document.getElementById("algorithm");

let totalWaitingTime = 0;
let totalTurnAroundTime = 0;
let totalResponseTime = 0;
let throughput = 0;

// Calculate the start and end times for each process 
let currentTime = 0;
const timeline = [];

if (selectedAlg === "FCFS") {
    heading.innerHTML = algorithms.FCFS;

    // Calculate for Gantt chart and timeline
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
}

if (selectedAlg === "SJF_N") {
    heading.innerHTML = algorithms.SJF_N;
}

if (selectedAlg === "PRI_N") {
    heading.innerHTML = algorithms.PRI_N;
}

if (selectedAlg === "SJF_P") {
    heading.innerHTML = algorithms.SJF_P;
}

if (selectedAlg === "PRI_P") {
    heading.innerHTML = algorithms.PRI_P;
}

if (selectedAlg === "RR") {
    heading.innerHTML = algorithms.RR;
}

console.log(timeline);

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

// Calculate and print throughput
throughput = (processes.length / currentTime).toFixed(2);
const throughputElement = document.getElementById("throughput-value");
throughputElement.innerHTML = throughput;

// Calculate and print average waiting time
const averageWaitingTime = document.getElementById("avg-waiting-time-value");
averageWaitingTime.innerHTML = (totalWaitingTime / processes.length).toFixed(2);

// Calculate and print average turnaround time
const averageTurnAroundTime = document.getElementById("avg-turnaround-time-value");
averageTurnAroundTime.innerHTML = (totalTurnAroundTime / processes.length).toFixed(2);

// Calculate and print average response time
const averageResponseTime = document.getElementById("avg-response-time-value");
averageResponseTime.innerHTML = (totalResponseTime / processes.length).toFixed(2);