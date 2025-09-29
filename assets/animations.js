(function () {
  // Player animation frames (remote URLs)
  var ANIMS = {
    sword: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_6.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_7.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-ssasin_Sword_attack__frame_8.png'
    ],
    knife1: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Knife_throwing_Su-ssasin__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Knife_throwing_Su-ssasin__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Knife_throwing_Su-ssasin__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Knife_throwing_Su-ssasin__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Knife_throwing_Su-ssasin__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Knife_throwing_Su-ssasin__frame_6.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Knife_throwing_Su-ssasin__frame_7.png'
    ],
    knife2: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_6.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_7.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_8.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Su-_ssassin_knife_throw_1__frame_9.png'
    ],
    death: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_6.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_7.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/SU_sassin_death__frame_8.png'
    ]
  };

  // Roach enemy animations
  var ROACH_ANIMS = {
    idle: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Idle%20Roach_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Idle_Roach_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Idle_Roach_frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Idle_Roach_frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Idle_Roach_frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Idle_Roach_frame_5.png'
    ],
    attack: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach%20attack%20animation%20_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_attack_animation__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_attack_animation__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_attack_animation__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_attack_animation__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_attack_animation__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_attack_animation__frame_6.png'
    ],
    death: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach%20death%20animation%20_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_death_animation__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_death_animation__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_death_animation__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_death_animation__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_death_animation__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Roach_death_animation__frame_6.png'
    ]
  };

  // WiFi Yeti enemy animations
  var YETI_ANIMS = {
    idle: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi%20Yeti%20idle%20_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Yeti_idle__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Yeti_idle__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Yeti_idle__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Yeti_idle__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Yeti_idle__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Yeti_idle__frame_6.png'
    ],
    attack: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Attacking%20Wifi%20Yeti%201%20_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Attacking_Wifi_Yeti_1__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Attacking_Wifi_Yeti_1__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Attacking_Wifi_Yeti_1__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Attacking_Wifi_Yeti_1__frame_4.png'
    ],
    death: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi%20Death%20_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Death__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Death__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Death__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Death__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Death__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Wifi_Death__frame_6.png'
    ]
  };

  // Preload image frames
  var cache = {};
  var resolved = {}; // url -> blobURL

  function preloadAll() {
    Object.keys(ANIMS).forEach(function (key) {
      ANIMS[key].forEach(function (url) {
        if (!resolved[url]) {
          try {
            fetch(url).then(function (r) { return r.blob(); }).then(function (b) {
              var u = URL.createObjectURL(b);
              resolved[url] = u;
            }).catch(function () {
              var img = new Image(); img.src = url; cache[url] = img;
            });
          } catch (e) {
            var img2 = new Image(); img2.src = url; cache[url] = img2;
          }
        }
      });
    });

    // Preload roach animations
    Object.keys(ROACH_ANIMS).forEach(function (key) {
      ROACH_ANIMS[key].forEach(function (url) {
        if (!resolved[url]) {
          try {
            fetch(url).then(function (r) { return r.blob(); }).then(function (b) {
              var u = URL.createObjectURL(b);
              resolved[url] = u;
            }).catch(function () {
              var img = new Image(); img.src = url; cache[url] = img;
            });
          } catch (e) {
            var img2 = new Image(); img2.src = url; cache[url] = img2;
          }
        }
      });
    });

    // Preload yeti animations
    Object.keys(YETI_ANIMS).forEach(function (key) {
      YETI_ANIMS[key].forEach(function (url) {
        if (!resolved[url]) {
          try {
            fetch(url).then(function (r) { return r.blob(); }).then(function (b) {
              var u = URL.createObjectURL(b);
              resolved[url] = u;
            }).catch(function () {
              var img = new Image(); img.src = url; cache[url] = img;
            });
          } catch (e) {
            var img2 = new Image(); img2.src = url; cache[url] = img2;
          }
        }
      });
    });
  }

  function resolveFrame(url) {
    return resolved[url] || url;
  }

  function resolveAnimList(key) {
    var list;
    if (key === 'idle') {
      list = ANIMS.sword ? [ANIMS.sword[0]] : [];
    } else {
      list = ANIMS[key] || [];
    }
    return list.map(resolveFrame);
  }

  // Roach animation resolution
  function resolveRoachFrame(url) { return resolved[url] || url; }
  function resolveRoachAnimList(key) {
    var list = ROACH_ANIMS[key] || [];
    return list.map(resolveRoachFrame);
  }

  // Yeti animation resolution
  function resolveYetiFrame(url) { return resolved[url] || url; }
  function resolveYetiAnimList(key) {
    var list = YETI_ANIMS[key] || [];
    return list.map(resolveYetiFrame);
  }

  window.PLAYER_ANIMS = ANIMS;
  window.ROACH_ANIMS = ROACH_ANIMS;
  window.YETI_ANIMS = YETI_ANIMS;
  window.preloadPlayerAnims = preloadAll;
  window.resolvePlayerFrame = resolveFrame;
  window.resolveAnimList = resolveAnimList;
  window.resolveRoachFrame = resolveRoachFrame;
  window.resolveRoachAnimList = resolveRoachAnimList;
  window.resolveYetiFrame = resolveYetiFrame;
  window.resolveYetiAnimList = resolveYetiAnimList;
})();