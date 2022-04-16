currentDayElement = $('#currentDay');

var schedule = {};
var lastActiveTextArea = null;
var today;

$(document).ready(()=>{
    
    var now = moment();
    today = now.format('YYYYMMDD');

    schedule = JSON.parse(window.localStorage.getItem('schedule'));
    if (schedule === null){
        schedule = {};
        schedule[today]={};
    }
    else{
        let keys = Object.keys(schedule);
        var found = false;
        for(key of keys)
            if(key == today)
                found = true;
        if (!found)
            schedule[today] = {};
        else{
            schedule = {};
            schedule[today]={};
        }
    }
    console.log(schedule);
    window.localStorage.setItem('schedule', JSON.stringify(schedule));
   
    currentDayElement.text(now.format("dddd, MMMM Do YYYY"));
    
    let tb = $('.time-blocks');
    for(let i = 0, hour = moment("00:00:00", "hh:mm:ss"); i < 24; ++i, hour.add(1,'hours')){
        let dayRow = $('<div>');
        dayRow.addClass('row');

        let timeCol = $('<div>');
        timeCol.addClass('col-1');
        timeCol.addClass('hour');
        let timeVal = hour.format('hA') 
        timeCol.text(timeVal);

        let eventCol = $('<div>');
        eventCol.addClass('col-10');
        let eventInput = $('<textarea>');
        eventInput.attr('hour', timeVal);
        if (schedule[today][timeVal] !== undefined)
            eventInput.text(schedule[today][timeVal]);

        eventInput.focus((event)=>{
            event.preventDefault();
            var key;
            var originalSchedule;
            if (lastActiveTextArea !== null){
                key = lastActiveTextArea.attr('hour');
                originalSchedule = schedule[today][key];
            }
            if (lastActiveTextArea !== null && lastActiveTextArea.val() !== originalSchedule)
                removeText(lastActiveTextArea)
            lastActiveTextArea = $(event.target);
        })
        
        eventCol.append(eventInput);
        
        if (now < hour){
            timeCol.addClass('future-event-time')
            eventCol.addClass('future');
        }
        else {
            timeCol.addClass('past-event-time')
            eventInput.prop('disabled', true);
            if (now < hour.clone().add(1,'hours'))
                eventCol.addClass('present');
            else
                eventCol.addClass('past');
        }
        
        let lastCol = $('<div>');
        lastCol.addClass('col-1');
        lastCol.addClass('saveBtn');

        let saveIcon = $('<i>');
        saveIcon.attr('hour', timeVal);
        saveIcon.addClass('far fa-save');
        saveIcon.click(saveItem);
        lastCol.append(saveIcon);

        [timeCol, eventCol, lastCol].forEach(x=>dayRow.append(x))
        tb.append(dayRow);
    }
});

function saveItem(event){
    let siblings = $(event.target).parent().parent().children();
    var key = $(event.target).attr('hour');
    var value = $(`textarea[hour=${key}]`).val();
    schedule[today][key] = value;
    window.localStorage.setItem('schedule', JSON.stringify(schedule));
    lastActiveTextArea = null;
}

function removeText(target) {
    console.log(target);
    target.animate({
      opacity: "-=1"
    }, 1000, function() {
        target.val('');
        target.css('opacity', '100%');
    });
  }
