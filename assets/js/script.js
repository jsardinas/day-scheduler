currentDayElement = $('#currentDay');

var schedule = {};
var lastActiveTextArea = null;

$(document).ready(()=>{
    
    schedule = JSON.parse(window.localStorage.getItem('schedule'));
    if (schedule === null)
        schedule = {};

    var now = moment();
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
        if (schedule[timeVal] !== undefined)
            eventInput.text(schedule[timeVal]);

        eventInput.focus((event)=>{
            event.preventDefault();
            var key;
            var originalSchedule;
            if (lastActiveTextArea !== null){
                key = lastActiveTextArea.attr('hour');
                originalSchedule = schedule[key];
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
    schedule[key] = value;
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
