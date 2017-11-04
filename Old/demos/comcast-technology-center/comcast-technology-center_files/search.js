var isMobile = (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()));
var isTablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
	
var myCallback = function() {	
	if (document.readyState == 'complete') {
		buildSearchComponents();
	} else {
		if (navigator.userAgent.toLowerCase().indexOf('msie') > 0)
            $(document).ready(buildSearchComponents); 
        else if (isMobile || isTablet)
  			buildSearchComponents();       	
        else
            google.setOnLoadCallback(buildSearchComponents, true); 
	}
};

window.__gcse = {
  parsetags: 'explicit',
  callback: myCallback
};

(function() {
	//var cx = '001982923850323490540:yh5dz3in5a4';
	//var cx = '015884655980934954177:9vwj8dhdh7u';
	var cx = '014794307779690410862:yh5dz3in5a4';

	var gcse = document.createElement('script'); 
	gcse.type = 'text/javascript'; 
	gcse.async = true;
	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
})();

var results = "";
function buildSearchComponents(){
	var options = {resultsUrl:'/search',enableAutoComplete:"true",autoCompleteMatchType:"any",autoCompleteMaxCompletions:5};
	var navDiv = (isMobile && !isTablet) ? "mobile-search-field" : "nav-search-field";
	if (isAndroid && $(this).width()<=600){ 
		navDiv = "mobile-search-field";
	}
	google.search.cse.element.render({
		div: "results",
		gname: 'results',
		tag: 'searchresults-only',
		attributes: {noResultsString:"Oops! Your search did not return any results"}
	});
	google.search.cse.element.render({
		div: "results-search-field",
		gname: 'results',
		tag: 'searchbox-only',
		attributes: options
	});
	google.search.cse.element.render({
		div: navDiv,
		gname: 'results',
		tag: 'searchbox-only',
		attributes: options
	});
	google.search.cse.element.render({
		div: "footer-search-field",
		gname: 'results',
		tag: 'searchbox-only',
		attributes: options
	});
	google.search.cse.element.render({
		div: "error-search-field",
		gname: 'error-search',
		tag: 'searchbox-only',
		attributes: options
	});

	showResults();

	$('#' + navDiv + ' input').attr('placeholder', 'Start typing...');
	Placeholders.enable();
}

function showResults() {
	//configure search results totals
	if ($("#results").length) {
		results = $(".gsc-result-info").text();
		var e = google.search.cse.element.getElement("results");
		searchTerm = e.getInputQuery();

		//format corrected input text
		if ($(".gs-spelling").length) {
			searchTerm = $(".gs-spelling > a:first").text();
			$(".gs-spelling").parent().parent().hide();
			$(".gs-spelling-original").appendTo(".corrected-input");
			$(".corrected-input").show();
			$(".gs-spelling-original").css("display","block !important");
		}

		//format no results text
		setTimeout( function(){ 
				if ($(".gs-no-results-result").length) {		
					$(".no-results").show();
				}	
			}
		, 1000 );
	}

	//prefill field on error page
	if ($("#error-search-field").length) {
		var el = google.search.cse.element.getElement("error-search");
		el.prefillQuery("Search our site");
		
		//clear out the default text
		$("#error-search-field input.gsc-input").one('focusin', function(){
			el.prefillQuery("");
		});
	}
}

var SEARCH_QUERY_MANAGER = (function($){ 
  var POST_TYPE = [];
  var SORT;
  var ROOT_STRING;

  var today = moment(new Date());
  var yesterday = moment(today).subtract('hours',24);
  var past_week = moment(today).subtract('days',7);
  var past_month = moment(today).subtract('months',1);
  var past_year = moment(today).subtract('years',1);

  $(document).ready(function(e){
  	/*
  	* get search query value and build post type array
  	*/
  	var query = getParameterByName("q");  	
  	if(query){
  		if(query.indexOf(" more:pagemap:document-type:") > -1){
  			var type = query.split(" more:pagemap:document-type:");
  			ROOT_STRING = type[0];
  			if(type[1].indexOf(",") > -1){
  				POST_TYPE = type[1].split(",");
  			}else{
  				POST_TYPE.push(type[1]);
  			}
  		}else{
  			ROOT_STRING = query;
  		}
  	}

  	/*
  	* pull date sorts from query string (if set)
  	*/
  	var sort = getParameterByName("sort_label");
  	if(sort){
  		SORT = sort;
  	}else{
  		SORT = "all";
  	}

  	$(".yesterday").attr("data-key","yesterday");
  	$(".past_week").attr("data-key","past_week");
  	$(".past_month").attr("data-key","past_month");
  	$(".past_year").attr("data-key","past_year");

  	$(".yesterday").attr("data-val",yesterday.format("YYYYMMDD"));
  	$(".past_week").attr("data-val",past_week.format("YYYYMMDD"));
  	$(".past_month").attr("data-val",past_month.format("YYYYMMDD"));
  	$(".past_year").attr("data-val",past_year.format("YYYYMMDD"));

  	updateFilterUI();

  });
  
  var $search_filters = $(".search-filters");
  var $go = $search_filters.find(".apply-btn");
  var $groups = $search_filters.find(".group");
  var $type_filters = $search_filters.find(".type-filters");
  var $date_filters = $search_filters.find(".date-filters");

  $groups.find("button").each(function(index,value){
  	var $this = $(this);
  	$this.on("click", function(event){
  	  var type = $this.data("filter");
  	  var val = $this.data("val");
  	  var exists = existsInArray(POST_TYPE,$this.data("val"));
  	  if(type == "type"){
  	  	if(val === "all"){
  	  		POST_TYPE = [];
  	  	}else if(exists < 0){
  	  		POST_TYPE.push($this.data("val"));
  	  	}else{
  	  		POST_TYPE[exists] = "";
  	  		POST_TYPE.splice(exists, 1);
  	  	}
  	  }else if(type == "date"){
  	  	SORT = $(this).data("key");
  	  }
  	  updateFilterUI();
  	});
  });

  $go.on("click",function(e){
  	var _url = "/search?q="+buildQuery();
  	window.location = _url;
  });

	function existsInArray(arr,val){
		var len = arr.length;
  		for (var i = 0; i < len; i++) {
  	    	if(arr[i]==val){
  	    		return i;
  	    	}
  		}
  		return -1;
  	}

	function getParameterByName(name){
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regexS = "[\\?&]" + name + "=([^&#]*)";
	  var regex = new RegExp(regexS);
	  var results = regex.exec(window.location.search);
	  if(results == null)
	    return "";
	  else
	    return decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	function buildQuery(){
		var query = "";
		if(ROOT_STRING) query += ROOT_STRING;
		if(POST_TYPE.length > 0) query += " more:pagemap:document-type:"+POST_TYPE.join(",");
		if(SORT != "all"){
			var sort = "&sort=document-publish_date:r:" + $("."+SORT).data("val") + ":" + today.format("YYYYMMDD");
			query += sort;
			query += "&sort_label="+ SORT;
		} 
		return query;
	}

	function updateFilterUI(){
		var active = 0;
		$type_filters.find("button").each(function(e){
			if($(this).hasClass("clear") && POST_TYPE.length === 0){
				$(this).addClass("active");
				return;
			}
			$(this).removeClass("active");
			var len = POST_TYPE.length;
			for (var i = 0; i < len; i++) {
			    if($(this).data("val") == POST_TYPE[i]){
			    	active++;
			    	$(this).addClass('active');
			    }
			}
		});
		if(active > 0){
			$type_filters.find("button.clear").removeClass("active");
		}else{
			$type_filters.find("button.clear").addClass("active");
		}
		
		$date_filters.find("button").each(function(e){
			if($(this).data("key") == SORT){
				$(this).addClass("active");
			}else{
				$(this).removeClass("active");
			}
		});
	}

	

})(jQuery);




