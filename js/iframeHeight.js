function dyniframesize(down) {
	var doc = document.getElementById("viewIframe").contentDocument || document.frames["viewIframe"].document;
	$(doc).find("div:first").css("margin", "auto");

	var pTar = null;
	if (document.getElementById) {
		pTar = document.getElementById(down);
	} else {
		eval('pTar = ' + down + ';');
	}
	if (pTar && !window.opera) {
		//alert(pTar.contentDocument.domain = 'beisen.com');
		if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight) {
			//ns6 syntax
			if (pTar.contentWindow.document.body.tagName == "FRAMESET") {
				$(pTar.contentWindow.document.body.children[1].contentDocument.body).css("overflow-y", "hidden");
				pTar.height = pTar.contentWindow.document.body.children[1].contentDocument.body.offsetHeight;
			} else {
				pTar.height = $(pTar.contentDocument.body).height() + 80;
			}
		} else if (pTar.Document && pTar.Document.body.scrollHeight) {
			//ie5+ syntax
			if (pTar.Document.frames.length > 0) {
				$(pTar.Document.frames[1].document.body).css("overflow-y", "hidden");
				pTar.height = $(pTar.Document.frames[1].document.body).innerHeight();
			} else {
				pTar.height = pTar.Document.body.scrollHeight + 30;
			}
		}
	}
}
