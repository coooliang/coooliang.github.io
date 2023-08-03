
# Provider之HelloWorld

`原创` `2021-07-16 10:26:59`


pubspec.yaml:

```yaml
provider: ^5.0.0
```

main.dart：

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          Provider<FirstPageServiceButtonsProvider>(create: (_) => FirstPageServiceButtonsProvider()),
        ],
        child: MaterialApp(...);
  }
}
```

Provider class：

```dart
import 'package:flutter/material.dart';

class FirstPageServiceButtonsProvider with ChangeNotifier {
  int _page = 0;

  void changePage(page) {
    _page = page;
    notifyListeners();
  }

  get page => _page;
}
```

修改数据：

```dart
context.read<FirstPageServiceButtonsProvider>().changePage(index);
```

监听数据变化:

```dart
int page = context.watch<FirstPageServiceButtonsProvider>().page;
```