# Unity旋转角色

`原创` `2020-01-09 11:18:18`

currentHero为当前角色模型

```csharp
private void OnGUI() {
        if (Event.current.type == EventType.MouseDown) {//判断当前手指是按下事件
            touchFirst = Event.current.mousePosition;//记录开始按下的位置
        }
        if (Event.current.type == EventType.MouseDrag) {//判断当前手指是拖动事件
            touchSecond = Event.current.mousePosition;//记录拖动的位置
            currentHero.transform.Rotate(new Vector3(0, -(touchSecond.x - touchFirst.x), 0) * 1.5f, Space.World);
            touchFirst = touchSecond;
        }
    }
```
