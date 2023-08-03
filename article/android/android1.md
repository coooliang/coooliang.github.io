# Activity学习

`原创` `2013-10-07 18:59:55`

> 例子1：

startActivityForResult和startActivity；startActivityForResult()和onActivityResult()，setResult()方法一同使用。

1) startActivity( )仅仅是跳转到目标页面，若是想跳回当前页面，则必须再使用一次startActivity( )。

2) startActivityForResult( )可以一次性完成这项任务，当程序执行到这段代码的时候，页面会跳转到下一个Activity，而当这个Activity被关闭以后(this.finish())，程序会自动跳转会第一个Activity，并调用前一个Activity的onActivityResult( )方法。也就是说，第二个activity是调用setResult方法而不是startActivity来进行Activity跳转。

```java
 MainActivity类：        
        @Override
         protected void onCreate(Bundle savedInstanceState) {          
                //something......
                Button gotoButton = (Button) findViewById(R.id.intent_goto_button);
		gotoButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				Intent intent = new Intent();
				intent.setClass(MainActivity.this, SecondActivity.class);
				intent.putExtra("app_name", "MainActivity goto this!");
				startActivityForResult(intent, REQUEST_CODE);// 跳转到第二个Activity，当第二个Activity返回的时候会调用onActivityResult回调方法
			}
		});
	}

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		Log.d("MainActivity", "MainActivity-->onActivityResult");
		if (REQUEST_CODE == requestCode && resultCode == SecondActivity.RESULT_CODE) {
			Bundle bundle = data.getExtras();
			String back = bundle.getString("back");
			Log.d("MainActivity", "MainActivity-->onActivityResult back=" + back);
			Toast.makeText(MainActivity.this, back, Toast.LENGTH_LONG).show();
		}
		//super.onActivityResult(requestCode, resultCode, data);
	}

SecondActivity类：
public class SecondActivity extends Activity {
    public static final int RESULT_CODE = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        Intent intent = getIntent();
        Bundle b = intent.getExtras();
        String appName = b.getString("app_name");
        Toast.makeText(SecondActivity.this, appName, Toast.LENGTH_LONG).show();// 弹出第一个Activity传过来的消息

        Button button = (Button) findViewById(R.id.second_intent_button);// 为按钮添加事件，跳回第一个Activity
        button.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.putExtra("back", "Back Data");
                setResult(RESULT_CODE, intent);
                finish();
            }
        });
    }

    @Override
    public void onBackPressed() {
        Intent intent = getIntent();
        intent.putExtra("back", "Back Data");
        setResult(RESULT_CODE,intent);//点击返回和点击按钮返回也是一样的效果
        super.onBackPressed();
    }
}
```

> 例子2：

onSaveInstanceState的使用

```java
//onCreate方法中使用的Bundle与onSaveInstanceState方法的outState是同一个。
public class MainActivity extends Activity {
	public static final String TAG = "MainActivity";
	public static final String MAIN_EDIT_TEXT = "main_edit_text";

	private void init(Bundle savedInstanceState) {
		Button fb = (Button) findViewById(R.id.main_first_button);
		ClickListener lictener = new ClickListener(this);
		fb.setOnClickListener(lictener);

		if (savedInstanceState != null && savedInstanceState.containsKey(MAIN_EDIT_TEXT)) {
			EditText et = (EditText) findViewById(R.id.main_edit_text);
			et.setText(savedInstanceState.getString(MAIN_EDIT_TEXT));
		}
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		Log.d(TAG, "MainActivity-->onCreate()");
		init(savedInstanceState);
	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		Log.d(TAG, "MainActivity-->onSaveInstanceState()");// 跳转到第二个，暂停之前调用。

		EditText et = (EditText) findViewById(R.id.main_edit_text);
		if (et != null) {
			outState.putString(MAIN_EDIT_TEXT, et.getText().toString());
		}
	}
```