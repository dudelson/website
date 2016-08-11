var mpw, pwd, identicon;

function updateMPW() {
    update('identity', 'identity');
    mpw = new MPW( 'David Udelson', $('#masterPassword')[0].value );
    updateActive();
}
function updateActive() {
    if (!mpw)
        update('identity');

    else
        mpw.key.then(
            function() {
                update('site');
            },
            function(reason) {
                update('identity', null, reason);
            }
        );
}
function update(active, working, error) {
    // Working
    if (working == 'identity') {
        $('#identity').addClass('working').find('input, select').attr('disabled', 'disabled');
    }
    else {
        //$('#userName')[0].value = $('#masterPassword')[0].value = '';
	$('#masterPassword')[0].value = '';
        $('#identity').removeClass('working').find('input, select').removeAttr('disabled');
    }
    if (working == 'site')
        $('#site').addClass('working');
    else
        $('#site').removeClass('working');

    // Active
    if (active == 'identity') {
        $('#identity').addClass('active');
        $('#site').removeClass('active');

        if (!working)
           $('#masterPassword').focus();
    }
    else {
        $('#identity').removeClass('active');
        $('#site').addClass('active');
        $('#siteName').focus();
	$('#site-identicon').text(identicon.getIdenticonText());
	$('#site-identicon').css('color', identicon.getIdenticonColor());

        if (!working)
            $('#siteName').focus();
    }

    // Error
    $('#error').text(error);
}

function updateSite() {
    update('site', 'site');

    if (!mpw)
        updateActive();

    else
        mpw.generatePassword( $('#siteName')[0].value, $('#siteCounter')[0].valueAsNumber, $('#siteType')[0].value )
           .then( function (sitePassword) {
	       pwd = sitePassword;
               $('#sitePassword').text(hidePassword());
	       identicon.update(pwd, 'David Udelson');
               update('site');
           }, function (reason) {
               update('site', null, reason);
           });
}

function updateIdentity() {
    if(!identicon)
	identicon = new Identicon();
    identicon.update($('#masterPassword')[0].value, 'David Udelson');
    $('#id-identicon').text(identicon.getIdenticonText());
    $('#id-identicon').css('color', identicon.getIdenticonColor());
    $('#masterPassword').focus();
}

function selectText(element) {
    var doc = document, range, selection;    

    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();        
        range = doc.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function copyPasswordToClipboard() {
    $('#hidden').text(pwd);
    var hidden = document.getElementById('hidden'), msg;
    selectText(hidden);
    try {
	var success = document.execCommand('copy');
	msg = success ? "Password copied to clipboard" :"Unable to copy password to clipboard";
    } catch(error) {
	msg = "Unable to copy password to clipboard";
    }
    $('#hidden').text('');
    $('#copy-status').text(msg).fadeIn('fast').delay(2000).fadeOut('fast');
}

function hidePassword() {
    var s = '';
    for(var i=0; i<pwd.length; i++) s+='*';
    return s;
}

$(function() {
    $('#identity input').on('input', function() {
	updateIdentity();
    });
    $('#identity form').on('submit', function() {
        updateMPW();
        return false;
    });
    $('#site input, #site select').on('change input keyup', function() {
        updateSite();
    });
    $('#logout').on('click', function() {
        mpw = null;
        updateActive();
    });
    $('#sitePassword').on('click', function() {
	copyPasswordToClipboard();
    });
    $('#show').on('mousedown', function() {
	console.log('setting da text');
	$('#sitePassword').text(pwd);
    });
    $('#show').on('mouseup', function() {
	$('#sitePassword').text(hidePassword());
    });

    updateActive();
});
