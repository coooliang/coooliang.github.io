# Java多线程

`原创` `2013-04-21 18:47:12`

多线程一般情况下有两个要求，第一个是同步第二个是并发。线程的同步并不代表它可以并发执行。 

关于多线程这里有几个概念需要搞清楚：

1.同步：在写代码之前，自己需要搞清楚**原子操作**是什么以及操作的是否是**共享资源**（操作的必须是同一个对象，所以称为**对象的锁**）。

a) 所谓原子操作就是我的这一段代码在执行的时候，其它人需要等待我执行完，他才可以执行这一段代码。使用同步代码块synchronized(this){...}可以实现代码的同步，如果整个方法都需要同步，那么在方法前添加synchronized关键字，这样就将整个方法定为了原子操作**，**这和同步代码块是**等价的**。

b) 只有三种情况会释放对象的锁：第一种情况：执行完同步代码块；第二种情况：在执行同步代码块的过程中，遇到异常导致线程终止，锁也会被释放；第三种情况：在执行同步代码块的过程中，执行了锁所属对象的wait()方法，这个线程会释放锁，进入对象的等待池（在执行同步代码块的过程中执行Thread.sleep()和Thread.yield()方法，当前线程放弃CPU，但**不会释放锁**）。

2.并发：这也可以叫做**线程之间的通信**，线程之间进行通信需要用到Object类的三个方法：wait()，notify()或notifyAll()。

3.线程并发与同步中要有**等待池和锁池**的概念。一般情况下在同步方法的最开始调用notifyAll()，此时会唤醒等待池中等待的线程，Java虚拟机把对象的等待池中所有的线程都转到对象的锁池中。当其中的线程有机会获得该对象的锁时就会被执行。当需要释放对象的锁时，调用wait()方法，此时线程释放对象的锁，Java虚拟机把该线程放到该对象的等待池中，该线程等待其它线程将它唤醒。（等待池和锁池的内容来自孙卫琴的《Java面向对象编程》400页，13.9线程通信）

好，了解了等待池，锁池，原子操作，线程通信这些概念就可以开始写一个例子（其中代码注释了一些细节）。

```java
//共享资源
public class Stack {
	private String[] list = new String[2000];
	private int point = -1;

	public void push(String goods) {
		this.notifyAll();
		while (list.length - 1 == point) {// 这里要使用while而不能使用if
			try {
				this.wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		point++;
		list[point] = goods;
	}

	public String pop() {
		this.notifyAll();
		while (point == -1) {
			try {
				// 没有线程调用notify时，该线程会一直等待。
				// wait方法必须放在一个循环中，因为在多线程环境中，共享对象的状态随时可能被改变，当一个在对象等待池中的线程被唤醒后，并不一定立即恢复运行，
				// 等到这个线程获得了锁及CPU才可以继续运行，有可能此时对象的状态已经发生了改变，所以要用while
				this.wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		String goods = list[point];
		list[point] = null;
		point--;

		return goods;
	}

	public synchronized int getPoint() {
		return point;
	}
}
```

```java
//生产者
public class Producer extends Thread {
	private Stack stack;

	public Producer(Stack stack) {
		this.stack = stack;
	}

	@Override
	public void run() {
		for (int i = 0; i < 3; i++) {
			synchronized (stack) {//这里要特别注意，这段代码就是原子操作（getPoint()，push()和打印内容这三步都是需要同步的内容）
				String goods = "goods" + (stack.getPoint() + 1);
				stack.push(goods);
				System.out.println("生产..." + goods);
			}
		}
	}
}
```

```java
//消费者
public class Consumer extends Thread {
	private Stack stack;

	public Consumer(Stack stack) {
		this.stack = stack;
	}

	@Override
	public void run() {
		for (int i = 0; i < 3; i++) {
			synchronized(stack){//这里要特别注意，这段代码就是原子操作
				String goods = stack.pop();
				System.out.println("消费..." + goods);
			}
		}
	}
}
```

```java
//执行例子
public class SyncTest {
	public static void main(String[] args) {
		Stack stack = new Stack();
		new Producer(stack).start();
		new Producer(stack).start();
		new Producer(stack).start();
		
		new Consumer(stack).start();
		new Consumer(stack).start();
		new Consumer(stack).start();
		new Consumer(stack).start();
		//此时程序不会执行完，因为消费者在等待生产者制造产品。
	}
}
```
