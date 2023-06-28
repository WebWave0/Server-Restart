import psutil

def kill_process(process_name):
    for proc in psutil.process_iter():
        if proc.name() == process_name:
            proc.kill()
            return True
    return False

process_name = 'Working.bat'
if kill_process(process_name):
    print(f"Process {process_name} killed successfully.")
else:
    print(f"Process {process_name} not found.")
