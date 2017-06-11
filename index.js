var location = 02135;
var unit = 'f';

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://wxdata.weather.com/wxdata/weather/local/02135?cc=*&unit=' + unit,
        dataType: 'xml',
        success: function(data) {processData(data);}
	});
});

function processData(data) {
    $(data).find('weather').each(function () {
        $(this).find('cc').each(function () {
            $(this).find('flik').each(function () {
                var temp = $(this).text();
                $('#temp').text(temp);
            })
        })
    })
}