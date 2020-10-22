"use strict";

/** 
    Source: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
*/

// variable definitions 
var CACHE_NAME = 'Collabots-v1';

var contentToCache = [
// icons 
    './assets/icons/icon-32.png',
    './assets/icons/icon-64.png',
    './assets/icons/icon-96.png',
    './assets/icons/icon-128.png',
    './assets/icons/icon-168.png',
    './assets/icons/icon-180.png',
    './assets/icons/icon-192.png',
    './assets/icons/icon-256.png',
    './assets/icons/icon-512.png',
    './assets/icons/maskable_icon.png',
// level icons 
    './assets/img/levels_icons/1.png',
    './assets/img/levels_icons/2.png',
    './assets/img/levels_icons/3.png',
    './assets/img/levels_icons/4.png',
    './assets/img/levels_icons/5.png',
    './assets/img/levels_icons/6.png',
    './assets/img/levels_icons/7.png',
    './assets/img/levels_icons/8.png',
    './assets/img/levels_icons/9.png',
    './assets/img/levels_icons/10.png',
    './assets/img/levels_icons/11.png',
    './assets/img/levels_icons/12.png',
    './assets/img/levels_icons/13.png',
    './assets/img/levels_icons/14.png',
    './assets/img/levels_icons/15.png',
    './assets/img/levels_icons/16.png',
    './assets/img/levels_icons/17.png',
    './assets/img/levels_icons/18.png',
    './assets/img/levels_icons/19.png',
    './assets/img/levels_icons/20.png',
    './assets/img/levels_icons/21.png',
    './assets/img/levels_icons/22.png',
    './assets/img/levels_icons/23.png',
    './assets/img/levels_icons/24.png',
    './assets/img/levels_icons/25.png',
    './assets/img/levels_icons/dd_blue.png',
// images 
    './assets/img/barrier_red_on_animated.png',
    './assets/img/barrier_blue_off.png',
    './assets/img/barrier_blue_on_animated.png',
    './assets/img/barrier_blue_on.png',
    './assets/img/barrier_green_off.png',
    './assets/img/barrier_green_on_animated.png',
    './assets/img/barrier_green_on.png',
    './assets/img/barrier_orange_off.png',
    './assets/img/barrier_orange_on_animated.png',
    './assets/img/barrier_red_off.png',
    './assets/img/barrier_red_on.png',
    './assets/img/begin1.png',
    './assets/img/begin2.png',
    './assets/img/bot.png',
    './assets/img/box.png',
    './assets/img/btnAgain.png',
    './assets/img/btnNext.png',
    './assets/img/choix.png',
    './assets/img/Croix-rouge.png',
    './assets/img/dd_blue_box.png',
    './assets/img/dd_blue.png',
    './assets/img/dd_red_box.png',
    './assets/img/dd_red.png',
    './assets/img/dd_violet.png',
    './assets/img/disable_launch.png',
    './assets/img/dps.png',
    './assets/img/end.png',
    './assets/img/etoile.png',
    './assets/img/etoileOff.png',
    './assets/img/explosion.png',
    './assets/img/explosion2.png',
    './assets/img/fleche_left.png',
    './assets/img/fleche_right.png',
    './assets/img/fond.png',
    './assets/img/forward_blue.png',
    './assets/img/forward_red.png',
    './assets/img/forward.png',
    './assets/img/fr-educ.png',
    './assets/img/gear_blue.png',
    './assets/img/gear_red.png',
    './assets/img/info.png',
    './assets/img/launch.png',
    './assets/img/levels_icons',
    './assets/img/menu.png',
    './assets/img/neon.png',
    './assets/img/options.png',
    './assets/img/pickup_blue.png',
    './assets/img/pickup_red.png',
    './assets/img/pression_blue_off.png',
    './assets/img/pression_blue_on.png',
    './assets/img/pression_green_off.png',
    './assets/img/pression_green_on.png',
    './assets/img/pression_orange_off.png',
    './assets/img/pression_orange_on.png',
    './assets/img/pression_red_off.png',
    './assets/img/pression_red_on.png',
    './assets/img/rest_blue.png',
    './assets/img/rest_red.png',
    './assets/img/rotate_left_blue.png',
    './assets/img/rotate_left_red.png',
    './assets/img/rotate_right_blue.png',
    './assets/img/rotate_right_red.png',
    './assets/img/rotate_screen_white.png',
    './assets/img/rotate_screen.png',
    './assets/img/speaker_volume_off.png',
    './assets/img/speaker_volume_on.png',
    './assets/img/teleport_violet_in.png',
    './assets/img/teleport_violet_out.png',
    './assets/img/teleport_yellow_in.png',
    './assets/img/teleport_yellow_out.png',
    './assets/img/title.png',
    './assets/img/undo_blue.png',
    './assets/img/undo_red.png',
    './assets/img/univ.png',
    './assets/img/wall1.png',
    './assets/img/wall2.png',
    './assets/img/wall3.png',
// sounds 
    './assets/sounds/Collabots.mp3',
    './assets/sounds/explosion.mp3',
    './assets/sounds/forward.mp3',
    './assets/sounds/Jingle_victoire.mp3',
    './assets/sounds/rotate.mp3',
    './assets/sounds/triumphal_fanfare.mp3',
// CSS
    './css/menu.css',
    './css/styles.css',
// main files 
    './index.html',    
    './js/Boxe.js',
    './js/client.min.js',
    './js/Collabots.js',
    './js/createjs.js',
    './js/DuoPreDoor.js',
    './js/loader.js',
    './js/menu.js',
    './js/Robot.js',
    './js/Stage.js',
    './js/Teleporter.js',
    './js/xp.js',
// manifest.json
    './manifest.json'
];

// service worker installation
self.addEventListener('install', function(e) {
    console.log('[Service Worker] Install');
    e.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
        console.log('[Service Worker] Caching application content & data');
        return cache.addAll(contentToCache);
    }));
});

var updatableContent = [];

// fecthing data
self.addEventListener('fetch', function(evt) {

    var fichier = evt.request.url.substr(evt.request.url.lastIndexOf('/')+1);
    
    // if requested on an updatable content, load it from the network and cache it
    if (updatableContent.some(function(uc) { return evt.request.url.indexOf(uc) >= 0; })) {
        evt.respondWith(
            caches.open(CACHE_NAME).then(function(cache) {
                console.log("[Service worker] Trying to fetch from network", fichier);
                return fetch(evt.request)
                    .then(function (response) {
                    // If the response was OK, clone it and store it in the cache.
                    if (response.status === 200) {
                        console.log("[Service worker] --> Network available, caching latest version", fichier);
                        cache.put(evt.request.url, response.clone());
                    }
                    return response;
                }).catch(function (err) {
                    // Network request failed, try to get it from the cache.
                    console.log("[Service worker] --> Network unavailable, using cached version", fichier);
                    return cache.match(evt.request);
                });
            }));
        return;
    }
    
    // otherwise load from cache by default, or fetch it if not present (and update cache)
    console.log("[Service worker] --> Loading from cache (if present)", fichier);
    evt.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.match(evt.request)
                .then(function(response) {
                    return response || fetch(evt.request);
            })
        })
    );
});


self.addEventListener('activate', (e) => {
    e.waitUntil(
        // cleaning previous caches
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if(CACHE_NAME.indexOf(key) === -1) {
                    console.log("[Service Worker] Cleaning old cache");
                    return caches.delete(key);
                }
          }));
        })
    );
});