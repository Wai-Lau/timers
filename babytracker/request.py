from flask import Flask, render_template, jsonify, request
import time

app = Flask(__name__)
timer_info = [
    {
        "name":"one",
        "timeLeft":135100,
        "repeat":True,
        "interval":60*1+15,
        "started":int(time.time())
    },
    {
        "name":"two",
        "timeLeft":126700,
        "repeat":False,
        "interval":11,
        "started":int(time.time())
    }
]

@app.route('/')
def main():
    return render_template("main.html")

@app.route('/getTimeRemaining/<timer>')
def get_time_remaining(timer):
    return jsonify(timer)

@app.route('/getTimerInfo')
def get_timer_info():
    update_timers()
    return jsonify(timer_info)

def update_timers():
    for timer in timer_info:
        timer['timeLeft'] = timer['started']+timer['interval']-int(time.time())

@app.route('/addTimer', methods=['POST'])
def addTimer():
    data = request.get_json(force=True)
    print(data)
    timer_info.append({
        "name":data['name'],
        "timeLeft":data['time'],
        "repeat":data['repeat'],
        "interval":data['time'],
        "started":int(time.time())
    })
    print(timer_info)
    return jsonify("Timer added successfully.")
