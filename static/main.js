let getTimerInfo = () => {
  $.ajax({
    url: `/getTimerInfo`,
    dataType: "json",
    success: (result) => {
      setAll(result);
    },
    });
}

let addTimer = (name, time, repeat) => {
  data = {"name":name, "time":time, "repeat":repeat};
  data = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: "/addTimer",
    data: data,
    success: (result) => {
      // alert(JSON.stringify(result));
      getTimerInfo();
    },
    dataType: "JSON"
  });
}

let setAll = (timers) => {
  let timerString = ""
  timers.forEach((timer) => {
    if (timer.timeLeft > 0) {
      timerString += `
      <div style="padding: 10px;" class="timer" id="${timer.name}">
        <strong> ${timer.name} </strong>
      <br>
        Time Left: <strong> ${timer.timeLeft} </strong>
      <br>
        Repeating: ${timer.repeat}
      <br>
        Started: ${timer.started}
      </div>
      `
    }
  });
  $("#timers").html(timerString);
}

let newTimer = () => {
  let name = $("#newTimerName").val();
  h = parseInt($("#newTimerHours").val()) ? parseInt($("#newTimerHours").val()) : 0;
  m = parseInt($("#newTimerMinutes").val()) ? parseInt($("#newTimerMinutes").val()) : 0;
  let repeat = $("#newTimerRepeat").prop('checked');
  $('#newTimerForm')[0].reset();
  addTimer(name, (h*60 + m)*60, repeat);
}

$( document ).ready(function() {
  setInterval(getTimerInfo, 500);
});
