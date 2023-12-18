function hook_checkServerTrusted() {
    var ClassName = "com.android.org.conscrypt.Platform";
    var Platform = Java.use(ClassName);
    var targetMethod = "checkServerTrusted";
    var len = Platform[targetMethod].overloads.length;
    console.log(len);
    for (var i = 0; i < len; ++i) {
        Platform[targetMethod].overloads[i].implementation = function () {
            console.log("class:", ClassName, "target:", targetMethod, " i:", i, arguments);
        };
    }
}

function hook_checkTrustedRecursive() {
    var ClassName = "com.android.org.conscrypt.TrustManagerImpl";
    var Platform = Java.use(ClassName);
    var targetMethod = "checkTrustedRecursive";
    var ArrayList = Java.use("java.util.ArrayList");

    var len = Platform[targetMethod].overloads.length;
    console.log(len);
    for (var i = 0; i < len; ++i) {
        Platform[targetMethod].overloads[i].implementation = function () {
            console.log("class:", ClassName, "target:", targetMethod, " i:", i, arguments);
            return ArrayList.$new(); 
        };
    }
}
function hook_ssl() {
    Java.perform(function () {
        hook_checkServerTrusted();
        hook_checkTrustedRecursive();
    });
}

setTimeout(hook_ssl, 100);