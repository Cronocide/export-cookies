
function exportCookies() {
    chrome.tabs.query({"status":"complete","windowId":chrome.windows.WINDOW_ID_CURRENT,"active":true}, function(tab){
        chrome.cookies.getAll({
            domain: undefined
        }, function (cookies) {
            domain = ""; flag = ""; path = "";
            secure = ""; expiration = ""; name = ""
            value = ""; tab="\t";
            return_block= "# Netscape HTTP Cookie File\n# This file was generated by the export-cookies Chrome extension.\n";
            for (var i = 0; i < cookies.length; i++) {
                domain=cookies[i].domain;
                cookies[i].sameSite == "strict" ? flag="FALSE":flag="TRUE";
                cookies[i].secure ? secure="TRUE":secure="FALSE";
                if (!cookies[i].expirationDate) {
                    expiration=Math.floor(Date.now() / 1000) + 600;
                } else {
                    expiration=parseInt(cookies[i].expirationDate, 10)
                };
                name=cookies[i].name;
                value = cookies[i].value;
                line=domain + tab + flag + tab + path + tab + secure + tab + expiration + tab + name + tab + value + "\n";
                return_block = return_block + line;
            }
            chrome.storage.local.get(null, function() {
                url = 'data:text;base64,' + btoa(return_block);
                chrome.downloads.download({
                    url: url,
                    filename: 'cookies.txt'
                });
            });
        });
    });
};
exportCookies();
