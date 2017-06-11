var queryResp = '/q/zmw:02108.1.99999';
var coat = 36;
var jacket = 45;
var sweater = 60;

function query(location) {
    $.ajax({
        type: 'GET',
        url: 'https://api.wunderground.com/api/dba29ab1640cac5b/hourly' + location + '.json',
        dataType: 'json',
        success: function(data) {processData(data);}
    });
}

function processData(data) {
    $('#searchResp').empty();
    $('#rec').show();
    var entries = data.hourly_forecast;
    var feels = entries[0].feelslike.english;
    var feelsMin = feels;
    for (var i = 1; i < 12; i++) {
        if (feelsMin > entries[i].feelslike.english) {
            feelsMin = entries[i].feelslike.english;
        }
    }
    var simp = 'No';
    var rec = 'you don\'t need a jacket';
    if (feelsMin < coat) {
        simp = 'Yes';
        rec = 'it\'s cold out today, you need a coat';
    } else if (feelsMin < jacket) {
        simp = 'Yes';
        rec = 'you should wear a jacket today';
    } else if (feelsMin < sweater) {
        simp = 'No';
        rec = 'you only need a sweater';
    }
    $('title').text('Do I Need a Jacket? ' + simp + '.');
    $('#rec').text(simp + ', ' + rec + '. The coldest it will feel today is ' + feelsMin + ' F.');
}

function search() {
    var query = $('#searchField').val();
    $('#rec').hide();
    $('body').append("<script src=\"http://autocomplete.wunderground.com/aq?cb=processQuery&query=" + query + "\"></script>");
    return false;
}

function processQuery(data) {
    var entries = data.RESULTS;
    $('#searchResp').empty();
    if (entries.length == 0) {
        $('#searchResp').append('No results.')
    } else {
        $('#searchResp').append('<ul></ul>');
    }
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        $('#searchResp ul').append('<li><a href="javascript:void(0);" onclick="query(\'' + entry.l + '\')">' + entry.name + '</a></li>')
    }
}