/*Slider CSS3*/
function slider(spcon, container, items, margin){
  var width = margin + ($(spcon+' '+items).width());
  var maxWidth = width * $(spcon+' '+items).length;
             
  var currentTranslateX = 0;
  $(spcon+' .wrapper-carrusel').css("height", $(spcon+' '+items).height());
  $(container).css("width", maxWidth);
  $(spcon+" .next").on('click', function(e) {
    e.preventDefault();
    if (currentTranslateX - width > -maxWidth + width*3) {
      currentTranslateX -= width;
      $(container).css("left",currentTranslateX);
    }else{
      currentTranslateX = 0;
      $(container).css("left",currentTranslateX);
    }
  });

  $(spcon+" .prev").on('click', function(e) {
    e.preventDefault();
    if (currentTranslateX + width <= 0) {
      currentTranslateX += width;
      $(container).css("left",currentTranslateX);
    }else{
      currentTranslateX = -width * ($(spcon+' '+items).length - 4 );
      $(container).css("left",currentTranslateX);
    }
  });
}

/*
Script Name: Javascript Cookie Script
Author: Public Domain, with some modifications
Script Source URI: http://techpatterns.com/downloads/javascript_cookies.php
Version 1.1.2
Last Update: 5 November 2009

Changes:
1.1.2 explicitly declares i in Get_Cookie with var
1.1.1 fixes a problem with Get_Cookie that did not correctly handle case
where cookie is initialized but it has no "=" and thus no value, the 
Get_Cookie function generates a NULL exception. This was pointed out by olivier, thanks
1.1.0 fixes a problem with Get_Cookie that did not correctly handle
cases where multiple cookies might test as the same, like: site1, site
This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
*/

// this fixes an issue with the old method, ambiguous values 
// with this test document.cookie.indexOf( name + "=" );

// To use, simple do: Get_Cookie('cookie_name'); 
// replace cookie_name with the real cookie name, '' are required
function getCookie( check_name ) {
  // first we'll split this cookie up into name/value pairs
  // note: document.cookie only returns name=value, not the other components
  var a_all_cookies = document.cookie.split( ';' );
  var a_temp_cookie = '';
  var cookie_name = '';
  var cookie_value = '';
  var b_cookie_found = false; // set boolean t/f default f
  var i = '';
  
  for ( i = 0; i < a_all_cookies.length; i++ )
  {
    // now we'll split apart each name=value pair
    a_temp_cookie = a_all_cookies[i].split( '=' );
    
    
    // and trim left/right whitespace while we're at it
    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
  
    // if the extracted name matches passed check_name
    if ( cookie_name == check_name )
    {
      b_cookie_found = true;
      // we need to handle case where cookie has no value but exists (no = sign, that is):
      if ( a_temp_cookie.length > 1 )
      {
        cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
      }
      // note that in cases where cookie is initialized but no value, null is returned
      return cookie_value;
      break;
    }
    a_temp_cookie = null;
    cookie_name = '';
  }
  if ( !b_cookie_found ) 
  {
    return null;
  }
}

/*
only the first 2 parameters are required, the cookie name, the cookie
value. Cookie time is in milliseconds, so the below expires will make the 
number you pass in the Set_Cookie function call the number of days the cookie
lasts, if you want it to be hours or minutes, just get rid of 24 and 60.

Generally you don't need to worry about domain, path or secure for most applications
so unless you need that, leave those parameters blank in the function call.
*/
function setCookie( name, value, expires, path, domain, secure ) {
  // set time, it's in milliseconds
  var today = new Date();
  today.setTime( today.getTime() );
  // if the expires variable is set, make the correct expires time, the
  // current script below will set it for x number of days, to make it
  // for hours, delete * 24, for minutes, delete * 60 * 24
  if ( expires )
  {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  //alert( 'today ' + today.toGMTString() );// this is for testing purpose only
  var expires_date = new Date( today.getTime() + (expires) );
  //alert('expires ' + expires_date.toGMTString());// this is for testing purposes only

  document.cookie = name + "=" +escape( value ) +
    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + //expires.toGMTString()
    ( ( path ) ? ";path=" + path : "" ) + 
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

// this deletes the cookie when called
function deleteCookie( name, path, domain ) {
  if ( getCookie( name ) ) document.cookie = name + "=" +
      ( ( path ) ? ";path=" + path : "") +
      ( ( domain ) ? ";domain=" + domain : "" ) +
      ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}