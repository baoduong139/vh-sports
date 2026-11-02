import http.server
import socketserver
import webbrowser
import os
import sys
import socket

# Chuyển thư mục làm việc về thư mục chứa script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 3000
HOST = "0.0.0.0"

def get_local_ip():
    """Lấy địa chỉ IP cục bộ trong mạng Wi-Fi để hiển thị cho thiết bị di động"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Thiết lập CORS và chống cache để code mới nhất luôn được nạp
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Ẩn log request thông thường để terminal luôn gọn gàng
        if args and str(args[1]) in ['200', '304']:
            return
        super().log_message(format, *args)

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        httpd = socketserver.TCPServer((HOST, PORT), CustomHandler)
    except OSError as e:
        print(f"[!] Cổng {PORT} đang bận, đang chuyển sang cổng dự phòng...")
        httpd = socketserver.TCPServer((HOST, 3001), CustomHandler)

    active_port = httpd.server_address[1]
    local_ip = get_local_ip()

    print("=" * 68)
    print(" ⚡ VH SPORTS - E-COMMERCE & FIGMA CANVAS VIEW SERVER")
    print("=" * 68)
    print(f" [1] Máy tính (Localhost):       http://localhost:{active_port}")
    print(f" [2] Tên miền tuỳ chỉnh:         http://vhsports.local:{active_port}")
    print(f" [3] Điện thoại cùng mạng Wi-Fi: http://{local_ip}:{active_port}")
    print("-" * 68)
    print(" 💡 Hướng dẫn đổi tên miền vhsports.local:")
    print("    Thêm dòng sau vào file 'C:\\Windows\\System32\\drivers\\etc\\hosts':")
    print("    127.0.0.1 vhsports.local")
    print("=" * 68)
    print(" Nhấn Ctrl + C để dừng máy chủ bất kỳ lúc nào.\n")

    try:
        webbrowser.open(f"http://localhost:{active_port}")
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nĐang tắt máy chủ VH Sports...")
        httpd.server_close()

if __name__ == "__main__":
    run_server()
