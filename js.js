var deadline;
var allDATA = '';
var counter = 1;
var viewIndex = 0;
var NotSorted;
var sortedArray;
var fetchedData = false;
var days = 0;
var tag = "android";

/*
* This function sends a basic http requests.
*/
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
function httpGetAsync(theUrl, callback,myparameter)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText,myparameter);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

/*
* This function handels fetched pages of questions and parses them.
* If the fetched page doesn't include questions from the specified date it will request one more page.
*/

function displayHTML(mytext){
    $("#counter").text("Fetched "+counter+" Pages");
    var startText = 'class="flush-left">'; 
    var endText = '<br class="cbt" />';
    var startIndex = mytext.indexOf(startText)+startText.length;
    var endIndex = mytext.indexOf(endText);
    var res = mytext.substring(startIndex,endIndex);
    res = res.trim();
    res = res.replace(/\n/ig, '');
    res = res.substring(0,res.length-6)
    res = res.trim();
    allDATA += res;
    if(res.indexOf(deadline) == -1){
      counter++;
      var url = 'https://stackoverflow.com/questions/tagged/android?sort=newest&pageSize=50&page='+counter;
      httpGetAsync('php.php?url='+encodeURIComponent(url), displayHTML);
    }else{
      allDATA = allDATA.replace(/<a href/g, '<a target="_blank" href');
      allDATA = allDATA.replace(/href="\//g, 'href="https://stackoverflow.com/');
      allDATA = allDATA.trim();
      allDATA = allDATA.replace(/\n/ig, '');
      NotSorted = $(allDATA);
      $("#counter").html("Total pages fetched = "+counter+" <br/>Total questions = "+NotSorted.length);
      ///////////////////////////// Add button to each Question
      
    NotSorted.find(".excerpt").each(function(){
      var txt = $(this).text();
      txt = txt.trim();
      $(this).html(txt+'<button class="showdetails" id="myupdate" name="go" >+</button>');
    });
      /////////////////////////////
      sortedArray = NotSorted.slice();
      function callback(a,b){
        var atext = $('strong',a)[0].innerText;
        var btext = $('strong',b)[0].innerText;
        var numa = parseInt(atext);
        var numb = parseInt(btext);
        return numb-numa;
      }
      sortedArray.sort(callback);
      //$("#page").html(sortedArray);
      $.unblockUI();
      $("#page").html('');
      displayTen(); 
      fetchedData = true;

    }

}
/*
* This function Displays 10 questions on the screen according to the user prefrences
* Prefrences like Most recent or Top rated, hide duplicate, and hide answered.
* It also hides the answered questions if the user wants to.
*/
function displayTen(){
    if(sortedArray.length <= viewIndex){
      return;
    }
    var max = sortedArray.length - viewIndex;
    if(max>10){
      max = 10;
    } 
  if($('input[name=top]:checked').val() == 1){
    var totalText = $("#page").html();
    //console.log("TOP Rated");
    for(var i =0;i<max;i++){
      totalText += sortedArray[viewIndex].outerHTML;
      viewIndex++;
    }
    $("#page").html(totalText);
  }else{
    //console.log("Most Recent");
    var totalText = $("#page").html();
    for(var i =0;i<max;i++){
      totalText += NotSorted[viewIndex].outerHTML;
      viewIndex++;
    }
    $("#page").html(totalText);
  }
  
    $(".showdetails").each(function(){
      $(this).click(function(){
        $(this).css("display", "none");
        var p = $(this).parent();
        var phtml = p.html();
        p.html(phtml+'<img src="busy.gif" />');
        var p2 = p.parent();
        var url = p2.find('a').attr('href');
        httpGetAsync('php.php?url='+encodeURIComponent(url), displayQuestion,p);
      });
      if(document.getElementById('hideduplicate').checked){
        var p = $(this).parent();
        var p2 = p.parent();
        var title = p2.find('a').text();
        if(title.indexOf('[duplicate]') != -1){
          var questiontag = p2.parent();
          questiontag.css("display", "none");
        }
      }
    });


  if(document.getElementById('hideanswered').checked) {
    console.log("Hide checked");
    var someele = $(".answered-accepted");
    someele.each(function(){
      var aa = $(this).parent();
      var bb = aa.parent();
      var cc = bb.parent();
      cc.css("display", "none");
    });
  }else{
    console.log("Hide Not checked");
  }
}
/*
* This function handels the data received from question page.
* It parses the recieved page and extracts the question then inject it to our main page.
*/
function displayQuestion(theText, jparent){
  //$("#page").html(theText);
  resulthtml = $(theText);
  //console.log(theText);
  var temp = resulthtml.find(".post-text:first");
  if(temp.length > 0) {
    jparent.html(temp);
  }else{
    jparent.html(theText);
  }
  //console.log(temp.text());

}
/*
* In This function checks if this is the first search
* Then it will calculates the date & call the function that fetches the pages
* if not then it will check if the user changed either number of days or tag or not
* if he did so it will calculates the date & call the function that fetches the pages
* if not it will just update the page to user prefrences.
*/
function fetchdata(){
    if(fetchedData && days == $('#mydays').val() && tag == $('#mytag').val()){
      viewIndex = 0;
      $("#page").html('');
      displayTen();
    }else{
      counter = 1;
      allDATA = '';
      days = $('#mydays').val();
      tag = $('#mytag').val();
      $("#page").html("<p>Fetching Data ...</p>");
      $("#counter").html('');
      $.blockUI({ message: '<h1><img src="busy.gif" /> Just a moment... '+$('#counter').text()+'</h1>' }); 
      var today = new Date();
      var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - days);
      var dd = String(lastWeek.getDate()).padStart(2, '0');
      var mm = String(lastWeek.getMonth() + 1).padStart(2, '0');
      var yyyy = lastWeek.getFullYear();

      deadline = yyyy + '-' + mm + '-' + dd;
      $("#dateee").text("From Date "+deadline);
      var url = 'https://stackoverflow.com/questions/tagged/'+tag+'?sort=newest&pageSize=50';
      httpGetAsync('php.php?url='+encodeURIComponent(url), displayHTML);
    } 
}

$(document).ready(function(){
  $("#myupdate").click(fetchdata);
   $(window).scroll(function() {   
     if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
         if(fetchedData){
          displayTen();
         }
     }
  });
});