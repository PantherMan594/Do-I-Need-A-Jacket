var queryResp = '/q/zmw:02108.1.99999';

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'http://api.wunderground.com/api/dba29ab1640cac5b/hourly' + queryResp + '.json',
        dataType: 'json',
        success: function(data) {processData(data);}
    });
});

function processData(data) {
    var entries = data.hourly_forecast;
    var temp = entries[0].temp.english;
    var feels = entries[0].feelslike.english;
    $('#temp').text(temp);
    $('#feels').text(feels);
    /*for (var i = 0; i < entries.length; i++) {

    }*/
}