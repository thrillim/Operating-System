#include <stdio.h> 
#include <unistd.h>
#include <sys/wait.h>
int main()
{
    int i;
    pid_t pid;
    for (i = 0; i < 4; i++)
        pid = fork();
        wait(NULL);
        printf("pid = %d\n", pid);
        printf("ppid = %d\n", getppid());
        printf("--------------\n");
    return 0;
}

// Some weird output is produced if 
// + line 13 goes before line 11
// + line 10 goes after line 13
