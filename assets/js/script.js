currentDayElement = $('#currentDay');

$(document).ready(()=>{
    var now = moment();
    
    currentDayElement.text(now.format("dddd, MMMM Do YYYY"));
    let tb = $('.time-blocks');
    for(let i = 0, hour = moment("00:00:00", "hh:mm:ss"); i < 24; ++i, hour.add(1,'hours')){
        let dayRow = $('<div>');
        dayRow.addClass('row');

        let timeCol = $('<div>');
        timeCol.addClass('col-1');
        timeCol.addClass('hour');
        // timeCol.css('border-top', '1px solid #CCC');
        // timeCol.css('text-align', 'right');
        // timeCol.css('padding-top', '20px');
        timeCol.text(hour.format('hA'));

        let eventCol = $('<div>');
        eventCol.addClass('col-10');
        eventCol.css('display','flex');
        let eventInput = $('<textarea>');
        eventInput.css('width', '100%');
        
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
        saveIcon.addClass('far fa-save');
        lastCol.append(saveIcon);

        [timeCol, eventCol, lastCol].forEach(x=>dayRow.append(x))
        tb.append(dayRow);
    }
});
