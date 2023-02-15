#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h> 
#include <stdlib.h>

#define MAX_LINE 80 /* The maximum length command */

void getCommand(char command[], char *args[]) {
    int length;
    int i;
    // Read the command
    fgets(command, MAX_LINE, stdin);
    length = strlen(command);

    // Replace the newline character with null terminator
    if (command[length - 1] == '\n') {
        command[length - 1] = '\0';
        length--;
    }

    // Split the command into arguments
    i = 0;
    args[i] = strtok(command, " ");
    while (args[i] != NULL) {
        i++;
        args[i] = strtok(NULL, " ");
    }
}

int isWaitNull (char *args[]) {
    int i = 0;
    while (args[i] != NULL) {
        if (strcmp(args[i], "&") == 0) {
            args[i] = "\0";
            return 1;
        }
        i++;
    }
    return 0;
}

int main(void) {
    char *command[MAX_LINE]; /* whole command line */
    char *args[MAX_LINE/2 + 1]; /* command line arguments */
    int should_run = 1; /* flag to determine when to exit program */
    pid_t pid;
    while (should_run) { 
        printf("osh>"); 
        fflush(stdout);
        /**
        * After reading user input, the steps are:
        * (1) fork a child process using fork() 
        * (2) the child process will invoke execvp()
        * (3) if command included &, parent will invoke wait() */

        getCommand(command, args);

        if (strcmp(args[0], "exit") == 0) {
            should_run = 0;
        } else {
            pid = fork();
            if (pid < 0) {
                printf("Fork Failed\n");
                return 1;
                //exit (1);
            } else if (pid == 0) {
                //child process will invoke execvp()
                if (execvp(args[0], args) == -1) { //a non valid command
                    int k = 0;
                    while (args[k] != NULL) {
                        printf("%d %s \n", k + 1, args[k]);
                        k++;
                    }
                    printf("%s :  Invalid Command (Type 'exit' to exit)\n", args[0]);
                }
            } else {
                //parent will invoke wait() if command include &
                if (isWaitNull(args) == 0) {
                    wait(NULL);
                }
            }
        }
    }
    return 0;
}

