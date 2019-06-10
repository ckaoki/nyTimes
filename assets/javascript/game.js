$(document).ready(function() {

    //API KEY   
    var apiKey = "uhbUymvIOEv2nv1m3b1mNwPA8YFeTShw";
    //original search url with no query search
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;
    
    //grab the search input element from HTML
    var searchInput = $("#searchInput");

    //grab the number of records form element from HTML 
    var numOfRecords = $("#numberRecords");

    // console.log(numOfRecords.val());

    //Once the search button is clicked, we build a new query URL and start the AJAX calls 
    $("#searchButton").on("click", function(event){

        event.preventDefault();

        var searchInputValue = searchInput.val(); //the value of the search input 
        var numRecords = numOfRecords.val(); //the value of the number of records form (a number 1 - 5);
        var startYear = $("#startYear").val(); //the value of the starting year
        var endYear = $("#endYear").val(); //value of the end year 

        var newURL; //the new URL to be built based on the search values the user inputs 

        //if the user has not input a search term we will alert them to do so
        if(searchInputValue === "") {
            alert("please enter a valid search term");
        //otherwise we can continue building the query URL 
        } else {
            //if the user has specified a start year and an end year, we build the query URL based on the years they input
            if(startYear !== "" && endYear !== "") {
                newURL = queryUrl + "&q=" + searchInputValue + "&facet_field=sources&face=true&begin_date=" + startYear + "0101&end_date=" 
                + endYear + "1231";
                console.log(newURL);
            //if the user only put a start year, we will build the query URL with an end date equal to the end of the given start year 
            } else if (startYear !== "" && endYear === ""){

                newURL = queryUrl + "&q=" + searchInputValue + "&facet_field=sources&face=true&begin_date=" + startYear +
                            "0101&end_date=" + startYear + "1231";
                console.log(newURL);
            //if years have not been specified with build the URL with just the input search term 
            } else if (startYear === "" & endYear === "" ){

                newURL = queryUrl + "&q=" + searchInputValue;
                console.log(newURL);

            }

            //the AJAX call 
            $.ajax({
                url: newURL,
                method: "GET"
            }).then(function(response){
                //there is no parameter to specify the amount of records to give so we do it with a for/loop

                for(var i = 0; i <= numRecords - 1; i++) {
                    console.log(response.response.docs[i]);
                    var paraDiv = $("<div>");
                    var para = $("<h2>");
                    var author = $("<p>").text(response.response.docs[i].byline.original);
                    para.text(response.response.docs[i].headline.main);
                    paraDiv.append(para).append(author);
                    paraDiv.addClass("articleDiv");
                    $("#searchResults").append(paraDiv);
                }
            });
        }


    });

    $("#clearButton").on("click", function() {
        $("#searchResults").empty();
    });

}); 