var coat = 36;
var jacket = 45;
var sweater = 60;
var profile;

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
    var rain = false;
    var snow = false;
    for (var i = 1; i < 12; i++) {
        if (feelsMin > entries[i].feelslike.english) {
            feelsMin = entries[i].feelslike.english;
        }

        if (entries[i].condition.toLowerCase().includes("rain")) {
            rain = true;
        }
        if (entries[i].condition.toLowerCase().includes("snow")) {
            snow = true;
        }
    }

    var simp = 'No';
    var rec = 'you don\'t need a jacket';
    if (rain || snow) {
        simp = 'Yes';
    }
    if (snow) {
        rec = 'you should wear a coat today, it\'s snowing';
    } else if (rain) {
        if (feelsMin < coat) {
            rec = 'it\'s cold and raining out today, you need a coat';
        } else {
            rec = 'you should wear a jacket today, it\'s raining';
        }
    } else {
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
    }    
    $('title').text('Do I Need a Jacket? ' + simp + '.');
    $('#simpResp').text(simp + '. ');
    $('#longResp').text(rec + '. The coldest it will feel today is ' + feelsMin + ' F.');
}

function search() {
    var query = $('#searchField').val();
    $('#rec').hide();
    $('body').append("<script src=\"https://autocomplete.wunderground.com/aq?cb=processQuery&query=" + query + "\"></script>");
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

function onSignIn(googleUser) {
    profile = googleUser.getBasicProfile();
    $.ajax({
        type: 'GET',
        url: 'https://pantherman594.com/jacket.php?id=' + profile.getId(),
        success: function(data) {login(data);}
    });
}

function login(data) {
    $('#settings').show();
    if (data != "Error") {
        data = data.split(";");
        coat = data[0];
        jacket = data[1];
        sweater = data[2];

        $('#coat').val(coat);
        $('#jacket').val(jacket);
        $('#sweater').val(sweater);
    }
}

function settings() {
    if (!$('#coat').val()) $('#coat').val(coat);
    if (!$('#jacket').val()) $('#jacket').val(jacket);
    if (!$('#sweater').val()) $('#sweater').val(sweater);
    $.ajax({
        type: 'GET',
        url: 'https://pantherman594.com/jacket.php?id=' + profile.getId() + '&coat=' + $('#coat').val() + '&jacket=' + $('#jacket').val() + '&sweater=' + $('#sweater').val(),
        success: function(data) {login(data);}
    });
}