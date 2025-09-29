(function () {
  // Karenbot enemy animations
  var KARENBOT_ANIMS = {
    idle: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot%20idle%20_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_idle__frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_idle__frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_idle__frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_idle__frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_idle__frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_idle__frame_6.png'
    ],
    attack: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot%20attack_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_attack_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_attack_frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_attack_frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_attack_frame_4.png'
    ],
    death: [
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot%20death_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_1.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_2.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_3.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_4.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_5.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_6.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_7.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_8.png',
      'https://dcnmwoxzefwqmvvkpqap.supabase.co/storage/v1/object/public/sprite-studio-exports/620dfb9b-13c8-4733-a462-aea820328b33/library/frames/Karenbot_death_frame_9.png'
    ]
  };

  // Preload karenbot animations
  var cache = {};
  var resolved = {}; // url -> blobURL

  function preloadKarenbot() {
    // Preload karenbot animations
    Object.keys(KARENBOT_ANIMS).forEach(function (key) {
      KARENBOT_ANIMS[key].forEach(function (url) {
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

  // Karenbot animation resolution
  function resolveKarenbotFrame(url) { return resolved[url] || url; }
  function resolveKarenbotAnimList(key) {
    var list = KARENBOT_ANIMS[key] || [];
    return list.map(resolveKarenbotFrame);
  }

  window.KARENBOT_ANIMS = KARENBOT_ANIMS;
  window.preloadKarenbotAnims = preloadKarenbot;
  window.resolveKarenbotFrame = resolveKarenbotFrame;
  window.resolveKarenbotAnimList = resolveKarenbotAnimList;
})();