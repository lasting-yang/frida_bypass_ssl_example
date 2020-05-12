
function hook_ssl() {
    var cert_dex = Java.openClassFile("/data/local/tmp/certs.dex");

    Java.perform(function () {
        cert_dex.load();
        var certs = Java.use("com.example.certs");
        var ClassName = "com.android.org.conscrypt.Platform";
        var Platform = Java.use(ClassName);
        var targetMethod = "checkServerTrusted";
        var len = Platform[targetMethod].overloads.length;
        console.log("checkServerTrusted overloads:", len);
        Platform.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.ConscryptEngine').implementation = 
        function(tm, chain, authType, engine) {
            var result = this.checkServerTrusted(tm, chain, authType, engine);
            console.log("checkServerTrusted 1 authType:", authType, " engine:", engine);
            return result;
        };

        Platform.checkServerTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.AbstractConscryptSocket').implementation = 
        function(tm, chain, authType, socket) {
            var s = socket.toString();
            var addr = s.substring(s.indexOf("[") + 1, s.indexOf(","));
            var host = addr.split("=")[1].split("/")[0];
            if (host == "") {
                host = addr.split("=")[1].split("/")[1];
            }
            var r = certs.save_cert(host, chain);
            console.log("checkServerTrusted 2 authType:", authType, " socket:", socket, host);
            var tmp_chain = certs.get_cert(host);
            var result = this.checkServerTrusted(tm, tmp_chain, authType, socket);
            return result;
        };

        Platform.checkClientTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.ConscryptEngine').implementation = 
        function(tm, chain, authType, engine) {
            var result = this.checkClientTrusted(tm, chain, authType, engine);
            console.log("checkClientTrusted 1 authType:", authType, " engine:", engine);
            return result;
        };

        Platform.checkClientTrusted.overload('javax.net.ssl.X509TrustManager', '[Ljava.security.cert.X509Certificate;', 'java.lang.String', 'com.android.org.conscrypt.AbstractConscryptSocket').implementation = 
        function(tm, chain, authType, socket) {
            var result = this.checkClientTrusted(tm, chain, authType, socket);
            console.log("checkClientTrusted 2 authType:", authType, " socket:", socket);
            return result;
        };
        
    });
}

setTimeout(hook_ssl, 100);