import java.util.concurrent.Semaphore;

public class ThreeProcessesWithSemaphores {
    private static final Semaphore semaphore1 = new Semaphore(1);
    private static final Semaphore semaphore2 = new Semaphore(0);
    private static final Semaphore semaphore3 = new Semaphore(0);

    public static void main(String[] args) {
        Thread process1 = new Thread(new Runnable() {
            public void run() {
                try {
                    semaphore1.acquire();
                    System.out.println("Process 1 is running");
                    Thread.sleep(1000);
                    semaphore2.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread process2 = new Thread(new Runnable() {
            public void run() {
                try {
                    semaphore2.acquire();
                    System.out.println("Process 2 is running");
                    Thread.sleep(1000);
                    semaphore3.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        Thread process3 = new Thread(new Runnable() {
            public void run() {
                try {
                    semaphore3.acquire();
                    System.out.println("Process 3 is running");
                    Thread.sleep(1000);
                    semaphore1.release();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        process1.start();
        process2.start();
        process3.start();

    }
}
