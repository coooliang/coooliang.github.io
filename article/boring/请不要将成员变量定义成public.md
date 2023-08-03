# 请不要将成员变量定义成public

`原创` `2010-07-04 00:03:00`

```java
class HelloWorld {

  public static void main(String[] args) {
    HelloWorld hw = new HelloWorld();
    hw.printError();
  }

  void printError() {
    Variable v = new Variable();
    v.d = 123.0; //否则，破坏这个域值的捣乱者可能会出没在任何地方。
    v.var();
  }
}

class Variable {

  public double d = 0; //请不要将成员变量定义成public

  public void var() {
    System.out.println("Variable d is:" + d);
  }
}
```
