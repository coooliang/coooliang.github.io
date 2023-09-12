
# 查看地址LTS版本(nscurl)

`原创` `2023-09-12 14:08:12`


```
nscurl --verbose --ats-diagnostics https://mp.weixin.qq.com
```

```
Starting ATS Diagnostics

Configuring ATS Info.plist keys and displaying the result of HTTPS loads to https://mp.weixin.qq.com.
A test will "PASS" if URLSession:task:didCompleteWithError: returns a nil error.
================================================================================

Default ATS Secure Connection
---
ATS Default Connection
ATS Dictionary:
{
}
Result : PASS
---

================================================================================

Allowing Arbitrary Loads

---
Allow All Loads
ATS Dictionary:
{
    NSAllowsArbitraryLoads = true;
}
Result : PASS
---

================================================================================

Configuring TLS exceptions for mp.weixin.qq.com

---
TLSv1.3
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.3";
        };
    };
}
Result : PASS
---

---
TLSv1.2
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.2";
        };
    };
}
Result : PASS
---

---
TLSv1.1
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.1";
        };
    };
}
Result : PASS
---

---
TLSv1.0
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.0";
        };
    };
}
Result : PASS
---

================================================================================

Configuring PFS exceptions for mp.weixin.qq.com

---
Disabling Perfect Forward Secrecy
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

================================================================================

Configuring PFS exceptions and allowing insecure HTTP for mp.weixin.qq.com

---
Disabling Perfect Forward Secrecy and Allowing Insecure HTTP
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionAllowsInsecureHTTPLoads = true;
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

================================================================================

Configuring TLS exceptions with PFS disabled for mp.weixin.qq.com

---
TLSv1.3 with PFS disabled
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.3";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

---
TLSv1.2 with PFS disabled
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.2";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

---
TLSv1.1 with PFS disabled
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.1";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

---
TLSv1.0 with PFS disabled
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionMinimumTLSVersion = "TLSv1.0";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

================================================================================

Configuring TLS exceptions with PFS disabled and insecure HTTP allowed for mp.weixin.qq.com

---
TLSv1.3 with PFS disabled and insecure HTTP allowed
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionAllowsInsecureHTTPLoads = true;
            NSExceptionMinimumTLSVersion = "TLSv1.3";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

---
TLSv1.2 with PFS disabled and insecure HTTP allowed
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionAllowsInsecureHTTPLoads = true;
            NSExceptionMinimumTLSVersion = "TLSv1.2";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

---
TLSv1.1 with PFS disabled and insecure HTTP allowed
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionAllowsInsecureHTTPLoads = true;
            NSExceptionMinimumTLSVersion = "TLSv1.1";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

---
TLSv1.0 with PFS disabled and insecure HTTP allowed
ATS Dictionary:
{
    NSExceptionDomains =     {
        "mp.weixin.qq.com" =         {
            NSExceptionAllowsInsecureHTTPLoads = true;
            NSExceptionMinimumTLSVersion = "TLSv1.0";
            NSExceptionRequiresForwardSecrecy = false;
        };
    };
}
Result : PASS
---

================================================================================
```

