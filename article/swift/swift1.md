# String之HelloWorld

`原创` `2019-01-09 15:21:15`

```swift
import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated);
        
        let str = getStr(param: true);//返回值不可以为空时，使用:String
        
        let str2:String? = getStr2(true);//返回值可以为空时，使用:String? 使用String?类型的变量，需要加!
        
        print(str,str2!);//hello world
        
        //world
        //1.截取开头
        print(String(str2!.prefix(2)));//wo
        //2.截取结尾
        print(String(str2!.suffix(2)));//ld
        //3.截取中间
        let res = (str2! as NSString).substring(with: NSMakeRange(1, str2!.count-1));//转换为NSString 调用substring
        print(res);
        
    }
    
    func getStr(param:Bool) -> String {//返回值没有问号，表示一定不能为空
        if param {
            return "hello"
        }
        //return nil //Nil is incompatible with return type 'String'
        return ""
    }
    
    //_参数，使用时可以不用传递参数名称
    func getStr2(_ param:Bool) -> String?{//加问号，表示返回值可以为空
        if param{
            return "world"
        }
        return nil
    }
    
}


```

