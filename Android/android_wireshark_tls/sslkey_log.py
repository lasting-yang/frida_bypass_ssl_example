import frida
import sys

file_sskkey = open("ssl_key.txt", "a+")

def on_message(message, data):
    global file_sskkey
    if message['type'] == 'send':
        file_sskkey.write(message['payload'] + "\n")
        file_sskkey.flush()
        print(message['payload'])
    else:
        pass

package_name = sys.argv[1]
pid = frida.get_usb_device().spawn(package_name)
session = frida.get_usb_device().attach(pid) 
jscode = open("sslkey_log.js", "r").read()
script = session.create_script(jscode)
frida.get_usb_device().resume(pid)
script.on('message', on_message)
script.load()

sys.stdin.read()