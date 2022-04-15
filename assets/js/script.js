currentDayElement = $('#currentDay');

$(document).ready(()=>{
    var now = moment();
    console.log(now);
    currentDayElement.text(now.format("dddd, MMMM Do YYYY"));
    let tb = $('.time-blocks');
    for(let i = 9, hour = moment().startOf('hour'); i < 18; ++i, hour.add(1,'hours')){
        let dayRow = $('<div>');
        dayRow.addClass('row');

        let timeCol = $('<div>');
        timeCol.addClass('col-1');
        timeCol.css('border-top', '1px solid #CCC');
        timeCol.css('border-right', '1px solid #CCC');
        timeCol.css('text-align', 'right');
        timeCol.css('padding-top', '20px');
        timeCol.css('padding-right', '5px');
        timeCol.text(hour.format('hA'));

        let eventCol = $('<div>');
        eventCol.addClass('col-10');
        console.log(hour);
        if(now < hour)
            eventCol.addClass('future-event');
        else if (now < hour.clone().add(1,'hours'))
            eventCol.addClass('current-event');
        else
            eventCol.addClass('past-event');
        
        let lastCol = $('<div>');
        lastCol.addClass('col-1');
        lastCol.css('background-color', '#0EB0CB');

        [timeCol, eventCol, lastCol].forEach(x=>dayRow.append(x))
        tb.append(dayRow);
    }
});
