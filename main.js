var quoteContainer=document.getElementById("random-quote");
var btn=document.getElementById("btn");
document.getElementById("tweet").style.visibility="hidden";
var myTweet="";
btn.addEventListener("click",function(){
    
    document.getElementById("tweet").style.visibility="visible";
    if (document.contains(document.getElementById("quote-text"))) {
         document.getElementById("quote-text").remove();
         createQuote();            
         tweet.addEventListener("click",function(){
         if (myTweet.length>0){    
            tweetIt(myTweet);
         }else{
            alert("you need something to tweet");
         }
         });           
    } else {
         createQuote();
         tweet.addEventListener("click",function(){
         if (myTweet.length>0){    
            tweetIt(myTweet);
         }else{
            alert("you need something to tweet");
         }
         });  
    }
    myTweet="";
});



function createQuote(){
        var url="https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json";
        var myRequest = createCORSRequest('GET', url);
        if (!myRequest) {
           alert('CORS not supported');
           return;
        }
        myRequest.addEventListener('load',function(){
            var myData=JSON.parse(myRequest.responseText);
            myRequest.onerror = function() {
                alert('Woops, there was an error making the request.');
            };  
            renderHTML(myData);      
        });   
        myRequest.send();   
}
//functions used in this challenge
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

function tweetIt (someText) {
       var tweetUrl = 'https://twitter.com/home?status=' + encodeURIComponent(someText);
       window.open(tweetUrl,"_blank");
}    

function renderHTML(data){
    var LenJson=data.length;
    var Num=Math.floor(Math.random()*LenJson);
    console.log(Num);
    var QuoteString="<blockquote id='quote-text' class='quote'><p><span>"+data[Num].quoteText+"<cite id='quote-author'> "+data[Num].quoteAuthor+"</cite></span></p></blockquote>"
    
    quoteContainer.insertAdjacentHTML('beforeend',QuoteString);
    myTweet+=data[Num].quoteText;
    if (data[Num].quoteAuthor.length>0)
    {
        myTweet+=" ( "+data[Num].quoteAuthor+ " ) ";
    }
}

