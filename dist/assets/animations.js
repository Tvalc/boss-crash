(function () {
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
  }

  function resolveFrame(url) { return resolved[url] || url; }
  function resolveAnimList(key) {
    var list;
    if (key === 'idle') {
      list = ANIMS.sword ? [ANIMS.sword[0]] : [];
    } else {
      list = ANIMS[key] || [];
    }
    return list.map(resolveFrame);
  }

  window.PLAYER_ANIMS = ANIMS;
  window.preloadPlayerAnims = preloadAll;
  window.resolvePlayerFrame = resolveFrame;
  window.resolveAnimList = resolveAnimList;
})();
