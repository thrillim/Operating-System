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

// Define the processes in order of arrival time
const processes = [
    new Process("P1", 0, 10, 3),
    new Process("P2", 0, 1, 1),
    new Process("P3", 9, 2, 4),
    new Process("P4", 0, 1, 5)
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

const selectedAlg = "PRI_P";
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

}

if (selectedAlg === "SJF_N") {
    heading.innerHTML = algorithms.SJF_N;

    // Calculate for Gantt chart and timeline by SJF non-preemptive algorithm
    let cloneProcesses = [...processes];
    let currentProcesses = [];
    let index = 0;
    let countdown = processes.length;

    while (countdown > 0) {
        //console.log("cur",currentTime,...currentProcesses);
        //console.log(...cloneProcesses);
        // Get the current process
        for (let i = 0; i < cloneProcesses.length; i++) {
            const process = cloneProcesses[i];
            if (process.arrivalTime <= currentTime) {
                currentProcesses.push(process);
                cloneProcesses.splice(i, 1);
                i--;
            }
        }
        //console.log("cur",currentTime,...currentProcesses);
        //console.log(...cloneProcesses);

        if (currentProcesses.length === 0) {currentTime = cloneProcesses[0].arrivalTime; continue;}
        // Sort the current processes by burst time
        currentProcesses.sort((a, b) => a.burstTime - b.burstTime);
        const process = currentProcesses[0];
        currentProcesses.splice(0, 1);
        countdown--;
        // Calculate the start and end times
        // Start time is the current time
        const endTime = currentTime + process.burstTime;

        // Find the index of the process in the original array
        index = processes.findIndex((p) => p.name === process.name);

        timeline.push({ process: processes[index], startTime: currentTime, endTime: endTime });

        // Calculate waiting time
        processes[index].waitingTime = currentTime - processes[index].arrivalTime;
        totalWaitingTime += processes[index].waitingTime;

        // Calculate turn around time
        processes[index].turnAroundTime = endTime - processes[index].arrivalTime;
        totalTurnAroundTime += processes[index].turnAroundTime;
        
        // Calculate response time
        processes[index].responseTime = currentTime - processes[index].arrivalTime;
        totalResponseTime += processes[index].responseTime;

        currentTime = endTime;
    }

}

if (selectedAlg === "PRI_N") {
    heading.innerHTML = algorithms.PRI_N;
    // Calculate for Gantt chart and timeline by Priority non-preemptive algorithm
    let cloneProcesses = [...processes];
    let currentProcesses = [];
    let index = 0;
    let countdown = processes.length;

    while (countdown > 0) {
        // Get the current process
        for (let i = 0; i < cloneProcesses.length; i++) {
            const process = cloneProcesses[i];
            if (process.arrivalTime <= currentTime) {
                currentProcesses.push(process);
                cloneProcesses.splice(i, 1);
                i--;
            }
        }

        if (currentProcesses.length === 0) {currentTime = cloneProcesses[0].arrivalTime; continue;}
        // Sort the current processes by priority
        // Assume that the larger the number, the higher the priority
        //currentProcesses.sort((a, b) => b.priority - a.priority);
        // Assume that the smaller the number, the higher the priority
        currentProcesses.sort((a, b) => a.priority - b.priority);
        const process = currentProcesses[0];
        currentProcesses.splice(0, 1);
        countdown--;
        // Calculate the start and end times
        // Start time is the current time
        const endTime = currentTime + process.burstTime;

        // Find the index of the process in the original array
        index = processes.findIndex((p) => p.name === process.name);

        timeline.push({ process: processes[index], startTime: currentTime, endTime: endTime });

        // Calculate waiting time
        processes[index].waitingTime = currentTime - processes[index].arrivalTime;
        totalWaitingTime += processes[index].waitingTime;

        // Calculate turn around time
        processes[index].turnAroundTime = endTime - processes[index].arrivalTime;
        totalTurnAroundTime += processes[index].turnAroundTime;
        
        // Calculate response time
        processes[index].responseTime = currentTime - processes[index].arrivalTime;
        totalResponseTime += processes[index].responseTime;

        currentTime = endTime;
    }
}

if (selectedAlg === "SJF_P") {
    heading.innerHTML = algorithms.SJF_P;
    // Calculate for Gantt chart and timeline by SJF non-preemptive algorithm
    let cloneProcesses = [...processes];
    let currentProcesses = [];
    let index = 0;

    // Array for checking if the process has been appeared in the timeline
    let checked = [];
    for (let i = 0; i < processes.length; i++) {
        checked.push({ name: processes[i].name, checked: false });
    }
    
    do {
        // Filter the processes that have not completed yet
        cloneProcesses = cloneProcesses.filter((p) => p.burstTime > 0);
        // Get the current process
        for (let i = 0; i < cloneProcesses.length; i++) {
            const process = cloneProcesses[i];
            if (process.arrivalTime <= currentTime) {
                currentProcesses.push(process);
                cloneProcesses.splice(i, 1);
                i--;
            }
        }
        //console.log(...processes);
        if (currentProcesses.length == 0) {currentTime++; continue;}
        // Sort the current processes by burst time
        currentProcesses.sort((a, b) => a.burstTime - b.burstTime);

        const process = currentProcesses[0];
        currentProcesses.splice(0, 1);
        // Find the index of the process in the original array
        index = processes.findIndex((p) => p.name === process.name);
        console.log(...timeline);
        // If the process is the first process in the timeline array
        if (timeline.length === 0) {
            timeline.push({ process: processes[index], startTime: currentTime, endTime: currentTime + 1 });
        } else {
            // If the process is not the first process in the timeline array
            // and not the same as the last process in the timeline array
            if (timeline[timeline.length - 1].process.name !== process.name) {
                timeline.push({ process: processes[index], startTime: currentTime, endTime: currentTime + 1 });
            } else {
                // If the process is the same as the last process in the timeline array => extend the end time
                timeline[timeline.length - 1].endTime += 1;
            }
        }
        cloneProcesses.unshift({ name: process.name, arrivalTime: process.arrivalTime, burstTime: process.burstTime - 1, priority: process.priority });

        currentTime++;

        // Calculate waiting time
        processes[index].waitingTime = currentTime - processes[index].arrivalTime - processes[index].burstTime;

        // Calculate turn around time
        processes[index].turnAroundTime = currentTime - processes[index].arrivalTime;

        // Calculate response time
        if (checked[index].checked === false) {
            processes[index].responseTime = currentTime - 1 - processes[index].arrivalTime;
            checked[index].checked = true;
        }

    }
    while (cloneProcesses.length > 0);
    currentTime--;

    // Calculate the total waiting time
    totalWaitingTime = processes.reduce((total, process) => total + process.waitingTime, 0);
    // Calculate the total turn around time
    totalTurnAroundTime = processes.reduce((total, process) => total + process.turnAroundTime, 0);
    // Calculate the total response time
    totalResponseTime = processes.reduce((total, process) => total + process.responseTime, 0);
}

if (selectedAlg === "PRI_P") {
    heading.innerHTML = algorithms.PRI_P;
        // Calculate for Gantt chart and timeline by SJF non-preemptive algorithm
        let cloneProcesses = [...processes];
        let currentProcesses = [];
        let index = 0;
    
        // Array for checking if the process has been appeared in the timeline
        let checked = [];
        for (let i = 0; i < processes.length; i++) {
            checked.push({ name: processes[i].name, checked: false });
        }
        
        do {
            // Filter the processes that have not completed yet
            cloneProcesses = cloneProcesses.filter((p) => p.burstTime > 0);
            // Get the current process
            for (let i = 0; i < cloneProcesses.length; i++) {
                const process = cloneProcesses[i];
                if (process.arrivalTime <= currentTime) {
                    currentProcesses.push(process);
                    cloneProcesses.splice(i, 1);
                    i--;
                }
            }
            //console.log(...processes);
            if (currentProcesses.length == 0) {currentTime++; continue;}
            // Sort the current processes by priority
            // Assume that the larger the number, the higher the priority
            //currentProcesses.sort((a, b) => b.priority - a.priority);
            // Assume that the smaller the number, the higher the priority
            currentProcesses.sort((a, b) => a.priority - b.priority);
    
            const process = currentProcesses[0];
            currentProcesses.splice(0, 1);
            // Find the index of the process in the original array
            index = processes.findIndex((p) => p.name === process.name);
            console.log(...timeline);
            // If the process is the first process in the timeline array
            if (timeline.length === 0) {
                timeline.push({ process: processes[index], startTime: currentTime, endTime: currentTime + 1 });
            } else {
                // If the process is not the first process in the timeline array
                // and not the same as the last process in the timeline array
                if (timeline[timeline.length - 1].process.name !== process.name) {
                    timeline.push({ process: processes[index], startTime: currentTime, endTime: currentTime + 1 });
                } else {
                    // If the process is the same as the last process in the timeline array => extend the end time
                    timeline[timeline.length - 1].endTime += 1;
                }
            }
            cloneProcesses.unshift({ name: process.name, arrivalTime: process.arrivalTime, burstTime: process.burstTime - 1, priority: process.priority });
    
            currentTime++;
    
            // Calculate waiting time
            processes[index].waitingTime = currentTime - processes[index].arrivalTime - processes[index].burstTime;
    
            // Calculate turn around time
            processes[index].turnAroundTime = currentTime - processes[index].arrivalTime;
    
            // Calculate response time
            if (checked[index].checked === false) {
                processes[index].responseTime = currentTime - 1 - processes[index].arrivalTime;
                checked[index].checked = true;
            }
    
        }
        while (cloneProcesses.length > 0);
        currentTime--;
    
        // Calculate the total waiting time
        totalWaitingTime = processes.reduce((total, process) => total + process.waitingTime, 0);
        // Calculate the total turn around time
        totalTurnAroundTime = processes.reduce((total, process) => total + process.turnAroundTime, 0);
        // Calculate the total response time
        totalResponseTime = processes.reduce((total, process) => total + process.responseTime, 0);
}

if (selectedAlg === "RR") {
    heading.innerHTML = algorithms.RR;
}

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

// Draw the timeline
const drawTimeLine = document.getElementById("timeline");
for (let i = 1; i <= currentTime; i++) {
    const div = document.createElement("div");
    div.className = "milestone";
    div.innerHTML = i;
    div.style.width = `${unit}px`;
    drawTimeLine.appendChild(div);
}

//console.log(...timeline);

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
    const index = processes.findIndex((p) => p.name === process.name);
    const color = `hsl(${index * unit * 1.28}, 90%, 65%)`;
    const div = document.createElement("div");

    gainCell += endTime - startTime;

    div.className = "process";
    div.style.width = `${width}px`;
    div.style.left = `${left}px`;
    div.style.background = color;
    div.dataset.name = process.name;
    ganttChart.appendChild(div);
}
