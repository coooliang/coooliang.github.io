

cocoapods引入

```bash
pod 'RealmSwift'
```


PO:

```bash
import HandyJSON
import RealmSwift

class CoinInfo: Object,HandyJSON,Decodable{
    @objc dynamic var nid: Int = 0
    @objc dynamic var name: String = ""
    @objc dynamic var symbol: String = ""
    @objc dynamic var price_usd: Double = 0
    
    required override init() {}
    
    //自增ID
    static func incrementID() -> Int {
        let realm = try! Realm()
        return (realm.objects(CoinInfo.self).max(ofProperty: "nid") as Int? ?? 0) + 1
    }
    
    //主键字段名称
    override class func primaryKey() -> String{
       return "nid"
    }
    
	//保存
    static func save(info:CoinInfo) {
        let realm = try! Realm()
        realm.beginWrite()
        info.nid = CoinInfo.incrementID()
        realm.add(info)
        try! realm.commitWrite()
    }
    
    //删除
	static func del(info:CoinInfo){
        let realm = try! Realm()
        realm.beginWrite()
        realm.delete(info)
        try! realm.commitWrite()
    }
    
    //条件查询
    static func query(name:String) -> [CoinInfo]{
        let realm = try! Realm()
        let predicate = NSPredicate(format:"name = '\(name)'")
        let list = realm.objects(CoinInfo.self).filter(predicate)
        return Array(list)
    }
    
    //查询所有
    static func queryAll() -> [CoinInfo]{
        let realm = try! Realm()
        let list = realm.objects(CoinInfo.self).sorted(byKeyPath: "nid", ascending: true)
        return Array(list)
    }
}
```


