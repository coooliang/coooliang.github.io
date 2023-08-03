
# Banner

`原创` `2021-07-21 15:54:16`

pubspec.yaml:

```yaml
flutter_swiper_null_safety: ^1.0.2
```

banner.dart

```dart
import 'package:flutter/material.dart';
import 'package:flutter_swiper_null_safety/flutter_swiper_null_safety.dart';

class BannerView extends StatefulWidget {
  List<Image> imgs = [];
  @override
  _BannerViewState createState() => _BannerViewState();
}

class _BannerViewState extends State<BannerView> with TickerProviderStateMixin {
  List<Image> imgs = [];

  @override
  void initState() {
    super.initState();
    imgs = widget.imgs;
  }

  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width / 320;
    return Container(
      height: 165 * w,
      child: Swiper(
        itemBuilder: (BuildContext context, int index) {
          return imgs[index];
        },
        autoplay: true,
        autoplayDelay: 5000,
        itemCount: imgs.length,
        scrollDirection: Axis.horizontal,
        pagination: const SwiperPagination(
            builder: DotSwiperPaginationBuilder(color: Color.fromARGB(255, 247, 144, 172), activeColor: Colors.white)),
      ),
    );
  }
}
```

first_page.dart:

```
import 'package:demo1/models/app_theme.dart';
import 'package:flutter/material.dart';

import 'views/banner_view.dart';
import 'views/service_buttons.dart';

class FirstPage extends StatefulWidget {
  @override
  _FirstPageState createState() => _FirstPageState();
}

class _FirstPageState extends State<FirstPage> with TickerProviderStateMixin {
  List<Widget> listViews = <Widget>[];

  final ScrollController scrollController = ScrollController();

  @override
  void initState() {
    listViews.add(banner());
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppTheme.background,
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Stack(
          children: <Widget>[
            getMainListViewUI(),
          ],
        ),
      ),
    );
  }

  Future<bool> getData() async {
    await Future<dynamic>.delayed(const Duration(milliseconds: 50));
    return true;
  }

  Widget getMainListViewUI() {
    return FutureBuilder<bool>(
      future: getData(),
      builder: (BuildContext context, AsyncSnapshot<bool> snapshot) {
        return ListView.builder(
          controller: scrollController,
          itemCount: listViews.length,
          itemBuilder: (BuildContext context, int index) {
            return listViews[index];
          },
        );
      },
    );
  }

  Widget banner() {
    List<Image> imgs = [
      Image.asset(
        'assets/banner/banner1.png',
        fit: BoxFit.fill,
      ),
      Image.asset(
        'assets/banner/banner2.png',
        fit: BoxFit.fill,
      ),
      Image.asset(
        'assets/banner/banner1.png',
        fit: BoxFit.fill,
      )
    ];
    BannerView bannerView = BannerView();
    bannerView.imgs = imgs;
    return bannerView;
  }
}

```
