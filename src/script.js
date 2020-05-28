// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/ @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

(async function() {
    'use strict';

    function getFavicon() {
        const favicon = document.querySelector("link[rel='icon']") ||
              document.querySelector("link[rel='shortcut icon']");

        if (favicon == null) {
            return window.location.origin + "/favicon.ico";
        }

        return favicon.href;
    }

	function createLoader() {
		const html = document.createElement("html");
		const style =
			"<style>" +
			".mid {" +
			"    text-align: center !important;" +
			"    margin: 0 auto !important;" +
			"}" +
			".loader {" +
			"    border: 16px solid #f3f3f3;" +
			"    border-top: 16px solid #3498db;" +
			"    border-radius: 50%;" +
			"    width: 120px;" +
			"    height: 120px;" +
            "    margin: inherit;" +
			"    animation: spin 2s ease-in-out infinite;" +
			"}" +
			"@keyframes spin {" +
			"    0% { transform: rotate(0deg); }" +
			"    100% { transform: rotate(360deg); }" +
			"}" +
			"</style>";

		const markdown =
			"<div class='mid'>" +
			"    <h1>Loading, please wait...</h1>" +
			"    <div class='loader'></div>" +
			"</div>";

		html.innerHTML += "<body>" + style + markdown + "</body>";
		return html;
	}

	window.loadingFacade = false;

    window.onmousedown = async (e) => {
		if (e.ctrlKey && e.shiftKey) {
            const dummyHtml = document.createElement("html");
            dummyHtml.innerHTML = document.documentElement.outerHTML;
            Array.from(document.documentElement.attributes).forEach((e) => {
                dummyHtml.setAttributeNode(e.cloneNode());
            });

            // Convert relative path to absolute path
            for (let i of dummyHtml.getElementsByTagName("script")) {
                if (i.src) {
                    i.src = i.src;
                }
            }
            for (let i of dummyHtml.getElementsByTagName("link")) {
                if (i.href) {
                    i.href = i.href;
                }
            }
            const regex = RegExp(/(.*?)url\((?!((?:[a-zA-Z]+:)\/\/(?:\/)?))(.*?)\)(.*)/gi);
            for (let i of dummyHtml.getElementsByTagName("style")) {
                i.innerHTML = i.innerHTML.replace(regex, "$1url(" + window.location.origin + "$3)$4");
            }
            await GM.setValue("page-capture", JSON.stringify(dummyHtml.outerHTML));
            const passwd = prompt("Type a password to unlock the original page.");
            await GM.setValue("page-passwd", (passwd != null && passwd != "") ? passwd : "");
            console.log("Page captured");
        } else if (e.ctrlKey && e.altKey) {
            sessionStorage.setItem("page-title", document.title);
            sessionStorage.setItem("page-favicon", getFavicon());

            await GM.getValue("page-capture", null).then(async (val) => {
                if (val != null && !window.loadingFacade) {
                    //window.res = Array.from(document.body.childNodes);
                    //window.res.forEach(e => document.body.removeChild(e));
                    document.body.style.display = "none";

                    window.dummyHtml = document.createElement("html");
                    window.dummyHtml.innerHTML = JSON.parse(val);
                    document.documentElement.appendChild(window.dummyHtml);

					await GM.getValue("page-passwd", null).then((val) => {
						sessionStorage.setItem("page-passwd", val);
					});
                } else {
					document.body.style.display = "none";
					window.pageLoader = !window.pageLoader
						? createLoader()
						: window.pageLoader;
					document.documentElement.appendChild(window.pageLoader);

					window.loadingFacade = true;
				}
            });
        } else if (e.shiftKey && e.altKey) {
			if (!window.loadingFacade) {
				const passwd = prompt("Insert password.");

				if (sessionStorage.getItem("page-passwd") == passwd) {
					document.documentElement.removeChild(window.dummyHtml);
					//window.res.forEach(e => document.body.appendChild(e));
					document.body.style.display = "";
					document.title = sessionStorage.getItem("page-title");

					const favicon = document.createElement("link");
					favicon.rel = "icon";
					favicon.href = sessionStorage.getItem("page-favicon");
					document.body.appendChild(favicon);
				}
			} else {
				document.body.style.display = "";
				document.documentElement.removeChild(window.pageLoader);
                window.loadingFacade = false;
			}
        }
    };
})();

