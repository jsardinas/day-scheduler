currentDayElement = $('#currentDay');

$(document).ready(()=>{
    var now = moment();
    console.log(now);
    currentDayElement.text(now.format("dddd, MMMM Do YYYY"));
    let tb = $('.time-blocks');
    for(let i = 9, hour = moment("09:00:00", "hh:mm:ss"); i < 26; ++i, hour.add(1,'hours')){
        let dayRow = $('<div>');
        dayRow.addClass('row');

        let timeCol = $('<div>');
        timeCol.addClass('col-1');
        timeCol.css('border-top', '1px solid #CCC');
        timeCol.css('text-align', 'right');
        timeCol.css('padding-top', '20px');
        timeCol.text(hour.format('hA'));

        let eventCol = $('<div>');
        eventCol.addClass('col-10');
        console.log(hour);
        if (now < hour){
            timeCol.addClass('future-event-time')
            eventCol.addClass('future-event');
        }
        else {
            timeCol.addClass('past-event-time')
            if (now < hour.clone().add(1,'hours'))
                eventCol.addClass('current-event');
            else
                eventCol.addClass('past-event');
        }
        
        let lastCol = $('<div>');
        lastCol.addClass('col-1');
        lastCol.css('background-color', '#0EB0CB');
        lastCol.css('border-left', '4px solid #0A8498');
        lastCol.css('border-radius', '0px 10px 10px 0px');

        [timeCol, eventCol, lastCol].forEach(x=>dayRow.append(x))
        tb.append(dayRow);
    }
});
