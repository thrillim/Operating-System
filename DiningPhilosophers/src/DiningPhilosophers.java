import java.util.concurrent.locks.ReentrantLock;

public class DiningPhilosophers {
    private static final int NUM_PHILOSOPHERS = 5;
    private static final int NUM_CHOPSTICKS = 5;
    private static final int EATING_TIME_MS = 2000;
    private static final int THINKING_TIME_MS = 3000;

    private static ReentrantLock[] chopsticks = new ReentrantLock[NUM_CHOPSTICKS];

    public static void main(String[] args) throws InterruptedException {
        // Initialize chopsticks
        for (int i = 0; i < NUM_CHOPSTICKS; i++) {
            chopsticks[i] = new ReentrantLock();
        }

        // Create philosophers
        Philosopher[] philosophers = new Philosopher[NUM_PHILOSOPHERS];
        for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
            philosophers[i] = new Philosopher(i);
        }

        // Start threads
        for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
            philosophers[i].start();
        }

        // Wait for threads to finish
        for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
            philosophers[i].join();
        }
    }

    static class Philosopher extends Thread {
        private int id;
        private ReentrantLock leftChopstick;
        private ReentrantLock rightChopstick;

        public Philosopher(int id) {
            this.id = id;
            this.leftChopstick = chopsticks[id];
            this.rightChopstick = chopsticks[(id + 1) % NUM_CHOPSTICKS];
        }

        @Override
        public void run() {
            while (true) {
                try {
                    System.out.printf("Philosopher %d is thinking...\n", id);
                    Thread.sleep(THINKING_TIME_MS);

                    // Acquire left chopstick
                    leftChopstick.lock();
                    System.out.printf("Philosopher %d is holding chopstick %d...\n", id, id);

                    // Acquire right chopstick
                    if (!rightChopstick.tryLock()) {
                        // Release left chopstick if right chopstick is not available
                        leftChopstick.unlock();
                        System.out.printf("Philosopher %d could not acquire chopstick %d, release chopstick %d\n",
                                id, (id + 1) % NUM_CHOPSTICKS, id);
                        continue;
                    }
                    System.out.printf("Philosopher %d is holding chopstick %d and %d...\n",
                            id, id, (id + 1) % NUM_CHOPSTICKS);

                    // Eat
                    System.out.printf("Philosopher %d is eating...\n", id);
                    Thread.sleep(EATING_TIME_MS);

                    // Release chopsticks
                    rightChopstick.unlock();
                    leftChopstick.unlock();
                    System.out.printf("Philosopher %d released chopstick %d and %d...\n",
                            id, id, (id + 1) % NUM_CHOPSTICKS);

                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
