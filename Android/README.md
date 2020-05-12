# Android

## 1. hook_ssl.js

```text
//一些app可以直接使用hook_ssl.js
frida -U --no-pause -f me.ele -l hook_ssl.js
```

## 2. hook_ssl2.js

```text
//hook_ssl.js不好用了后，再使用hook_ssl2.js

1. 先取消抓包
2. adb push certs.dex /data/local/tmp/certs.dex
3. 执行 hook_ssl2.js，收集chain
frida -U --no-pause -f me.ele -l hook_ssl2.js
4. 打开抓包
```