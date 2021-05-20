# Android
## 0. 推荐《Android使用Wireshark抓包》

[Android使用Wireshark抓包](./android_wireshark_tls/README.md)

## 1. hook_ssl.js

```text
//一些app可以直接使用hook_ssl.js
frida -U --no-pause -f xxxxxxxx.package.name -l hook_ssl.js
```

## 2. hook_ssl2.js

```text
//hook_ssl.js不好用了后，再使用hook_ssl2.js
//仅测试android10， 其他版本的系统有可能overloads不一样，需要自己改改。

1. 先取消抓包
2. adb push certs.dex /data/local/tmp/certs.dex
3. 执行 hook_ssl2.js，收集chain
frida -U --no-pause -f xxxxxxxx.package.name -l hook_ssl2.js
4. 打开抓包
```

