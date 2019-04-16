const webview = document.getElementById('page');
const indicator = document.getElementById('indicator');

document.getElementById('gts').addEventListener('click', e => {
  let urlf = document.getElementById('url');

	let https = urlf.value.slice(0, 8).toLowerCase();
  let http = urlf.value.slice(0, 7).toLowerCase();

	if (https == 'https://') urli = urlf.value;
	else if (http == 'http://') urli = urlf.value;
	else urli = 'http://' + urlf.value;

  webview.loadURL(urli);
});

document.getElementById('devtools').addEventListener('click', e => {
	webview.openDevTools();
});

url.addEventListener('keydown', e => {
	if (e.keyCode !== 13) return;

  let urlf = document.getElementById('url');

	let https = urlf.value.slice(0, 8).toLowerCase();
  let http = urlf.value.slice(0, 7).toLowerCase();

	if (https == 'https://') urli = urlf.value;
	else if (http == 'http://') urli = urlf.value;
	else urli = 'https://google.com/search?q=' + encodeURIComponent(urlf.value);

  webview.loadURL(urli);
});


document.getElementById('back').addEventListener('click', e => {
	if (webview.canGoBack) webview.goBack();
});

document.getElementById('forward').addEventListener('click', e => {
	if (webview.canGoForward) webview.goForward();
});

document.getElementById('reload').addEventListener('click', e => {
	webview.reload();
});

const loadstart = () => {
	indicator.innerText = 'Loading...';
};

const loadstop = () => {
	indicator.innerText = webview.getTitle();
	document.getElementById('url').value = webview.getURL();
};

webview.addEventListener('did-start-loading', loadstart);
webview.addEventListener('did-stop-loading', loadstop);
