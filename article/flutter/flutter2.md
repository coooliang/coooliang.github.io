
# JSON转换

`原创` `2021-07-01 16:35:33`

1. pubspec.yaml中添加json_annotation，build_runner，json_serializable :

```yaml
dependencies:
  flutter:
    sdk: flutter
    
  cupertino_icons: ^1.0.2

  json_annotation: ^4.0.1
  

dev_dependencies:
  flutter_test:
    sdk: flutter
    
  flutter_lints: ^1.0.0
  
  build_runner: ^2.0.5
  json_serializable: ^4.1.3
```

2. 创建User类

```dart
import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

//flutter packages pub run build_runner build
@JsonSerializable()
class User {
  String name;

  String email;

  @JsonKey(name: 'mobile')
  String phone;

  User(this.name, this.email, this.phone);

  factory User.fromJson(Map<String, dynamic> jsonMap) =>
      _$UserFromJson(jsonMap);

  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

3. 项目根目录运行，生成user.g.dart文件

```
flutter packages pub run build_runner build
```

user.g.dart：

```dart
// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

User _$UserFromJson(Map<String, dynamic> json) {
  return User(
    json['name'] as String,
    json['email'] as String,
    json['mobile'] as String,
  );
}

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'name': instance.name,
      'email': instance.email,
      'mobile': instance.phone,
    };
```

使用：

```dart
var jsonString = "";
var map = jsonDecode(jsonString);
User user = User.fromJson(map);
map = user.toJson();
```