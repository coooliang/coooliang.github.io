# 请不要编写返回可变对象的访问器(get)

`原创` `2010-07-04 00:56:00`

```java
import java.util.*; 
public class EmployeeTest2 { 
    public static void main(String[] args) { 
        Employee e = new Employee(); 
        Date d = e.getHireDay();//e.hireDay和d引用同一个对象。 
    //由于指向同一个引用，所以e.getHirDay()访问器 
    //与修改后的Date d 指向同一个引用，而不是当前时间 d.setTime(d.getTime()+1000000000); 
    System.out.println(e.getHireDay());//此处e.getHireDay的结果被改变了 
    //如果此时其它的对象调用e.getHireDay将不能得到当前时间。所以要创建副本 
} 
} 
class Employee{ 
    private Date hireDay; 
    public Employee(){ 
        GregorianCalendar gc = new GregorianCalendar(); 
        hireDay = gc.getTime(); 
    } 
    public Date getHireDay(){
        //请不要编写返回可变对象的访问器 
        return hireDay; 
        //return (Date)hireDay.clone(); 
        //创建副本，e.getHireDay()将不会与Date d指向同一个引用。 
    } 
} 
```
