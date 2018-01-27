// Your code here!

//document.onload = function () {
//	var xhr = new XMLHttpRequest;
//	xhr.open('POST', "https://e621.net/user/login.json?name=lightwave&password=05c49ff51042af795893e3a19a7e3bcd");
//	console.log(xhr.response);
//}


var output = document.getElementById("output-container");	//	define HTML area to display AJAX data
var btn = document.getElementById("btn");	//	create button reference
var reset = document.getElementById("reset-btn");	//	Reset button reference
var params = "";
var lastParams = "";
var btnClicks = 0;
var beforeID = "";
var e621 = {
	"index": {
		"URL": "https://e621.net/post/index.json",
		"posts": 20,
		"params": ["-male", "*_balls"]
	}
};
var board = {
	"e621": e621
};

function resetSearch() {
	console.log("Search cleared by user.");
	outputDestroy();
}

function outputDestroy() {
	while (output.hasChildNodes())
		output.removeChild(output.firstChild);
	beforeID = "";
	btnClicks = 0;
}

function makeURL(url) {
	var maxposts = document.getElementById("maxposts").value;
	url += '?';
	// Append parameters (tags)
	if (lastParams != document.getElementById("parameters").value)
		outputDestroy();
	var tags = (params == "") ? board.e621.index.params : params;
	for (i = 0; i < tags.length; i++) {
		url += (i == 0) ? 'tags=' + tags[i] : "+" + tags[i];
	}
	//	Append post limit
	url += '&limit=' + (isInt(maxposts) ? maxposts : e621.index.posts);
	//	Append lowest ID
	url += (beforeID == "") ? "" : '&' + beforeID;
	return url;
}

function isInt(value) {
	return !isNaN(value) &&
		   parseInt(Number(value)) == value &&
		   !isNaN(parseInt(value, 10));
}

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		console.log();
		// Check if the XMLHttpRequest object has a "withCredentials" property.
		// "withCredentials" only exists on XMLHTTPRequest2 objects.
		//xhr.withCredentials = true;
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
	console.log(xhr);
	return xhr;
}

//	add listener to button
btn.addEventListener("click",
	//	what the button will do when clicked
	function () {
		console.log();
		console.log(params = document.getElementById("parameters").value.split(' '));
		var xhr = new XMLHttpRequest;
		var URL = makeURL(e621.index.URL);
		xhr.onload = function () {
			var newData = JSON.parse(xhr.responseText);
			//console.log(params);
			console.log(newData);
			renderHTML(newData);
			console.log(beforeID = getLowestID(newData));
			lastParams = document.getElementById("parameters").value;
		};
		xhr.open('GET', URL, true);
		xhr.send();
		btnClicks++;
	}
);

/*
//	what the button will do when clicked
function btnFunction() {
	console.log();
	params = document.getElementById("parameters").value.split(' ');
	var xhr = new XMLHttpRequest;
	var URL = makeURL(e621.index.URL);
	xhr.onload = function () {
		var newData = JSON.parse(xhr.responseText);
		console.log(params);
		console.log(newData);
		renderHTML(newData);
		console.log(beforeID = getLowestID(newData));
	};
	xhr.open('GET', URL, true);
	xhr.send();
	btnClicks++;
}
*/	//	Commented function btnFunction()

reset.addEventListener("click",
	function () {
		resetSearch();
	});

function getLowestID(data) {
	var beforeID = "";
	for (i = 0; i < data.length; i++) {
		if (i == 0)
			beforeID = data[i].id;
		else
			beforeID = (data[i - 1].id < data[i].id) ? data[i - 1].id : data[i].id;
	}
	return ("before_id=" + beforeID);
}

function renderHTML(data) {
	var htmlRender = "";
	var type = "";
	htmlRender += "<div id=\"click" + btnClicks + "\">";
	for (i = 0; i < data.length; i++) {
		console.log(data[i].file_url + "| Length: " + data[i].file_url.length);
		type = detectType(data[i].file_url);
		if (type == "swf" || type == "webm" || type == "mp4") {
			console.log("Video detected");
			if (type == "webm" || type == "mp4")
				htmlRender += renderVIDEO(data[i]);
			else
				;
		}
		else
			htmlRender += renderIMG(data[i]);
	}
	htmlRender += "</div>";
	output.insertAdjacentHTML('beforeend', htmlRender);
}

function renderVIDEO(data) {
	var videoRender = "<video class=\"video\" controls autoplay loop \
		poster=\"" + data.preview_url + "\" \
		name=\"" + data.id + "\" muted><source \
		src=\"" + data.file_url + "\"></video>";
	videoRender = mediaWrap(videoRender);
	return videoRender;
}

function renderIMG(data) {
	//	TODO -- change div class to container, revert img class to media
	var imgRender = "<img id=\"" + data.id + "\" src=\"" + data.file_url + "\">";
	imgRender = mediaWrap(imgRender);
	return imgRender;
}

function mediaWrap(data) {
	return "<div class=\"media-container\">" + data + "<\/div>";
}

function detectType(url) {
	var i = 1;
	var ftype = "";
	while (url[url.length - i] != '.' && i < url.length) {
		i++;
	}
	while (i-- > 1) {
		ftype += url[url.length - i];
	}
	var isAnimated = (ftype == "webm" || "mp4" || "swf" || "gif") ? true : false;
	return ftype;
}
