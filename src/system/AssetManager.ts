/**
 * AssetManager.js
 * This manages the loading of image and sound assets. 
 * The loaded images and sounds are then acessable from any where by the following. 
 * AssetManager.images["myImageName"] no need for the full url or the extenision
 * 
 *  License: Apache 2.0
 *  author:  Ciar�n McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="../audio/Sound.ts"/>
declare var BufferLoader;

module AssetManager
{

    // Placing an image url in the below array
    // will make sure its is loaded before the game starts.
    // you can then acess the image by AssetManager.images["placeHolderImage"]
    // no need for the full url or the extenision
    var priorityImages = [
         'data/images/levels/level2.png',
    ];

    var priorityAudio = [
        "data/sounds/explosion1.wav",
        "data/sounds/explosion2.wav",
        "data/sounds/explosion3.wav",
        "data/sounds/WalkExpand.wav",
        "data/sounds/WalkCompress.wav",
        "data/sounds/drill.wav",
        "data/sounds/JUMP1.WAV",
        "data/sounds/TIMERTICK.WAV",
        "data/sounds/holygrenade.wav",
         "data/sounds/Speech/Irish/hurry.wav",
        "data/sounds/Speech/Irish/ohdear.wav",
        "data/sounds/Speech/Irish/fire.wav",
        "data/sounds/Speech/Irish/victory.wav",
         "data/sounds/Speech/Irish/ow1.wav",
         "data/sounds/Speech/Irish/ow2.wav",
         "data/sounds/Speech/Irish/ow3.wav",
         "data/sounds/Speech/Irish/byebye.wav",
         "data/sounds/Speech/Irish/traitor.wav",
         "data/sounds/Speech/Irish/youllregretthat.wav",
        "data/sounds/Speech/Irish/justyouwait.wav",
        "data/sounds/Speech/Irish/watchthis.wav",
        "data/sounds/Speech/Irish/fatality.wav",
        "data/sounds/Speech/Irish/laugh.wav",
        "data/sounds/Speech/Irish/incoming.wav",
        "data/sounds/Speech/Irish/grenade.wav",
        "data/sounds/Speech/Irish/yessir.wav",
        "data/sounds/cantclickhere.wav",
        "data/sounds/StartRound.wav",
        "data/sounds/JetPackLoop1.wav",
        "data/sounds/JetPackLoop2.wav",
        "data/sounds/CursorSelect.wav",
        "data/sounds/fuse.wav",
        "data/sounds/fanfare/Ireland.wav",
        "data/sounds/NinjaRopeFire.wav",
        "data/sounds/NinjaRopeImpact.wav",
        "data/sounds/ROCKETPOWERUP.wav",
        "data/sounds/HOLYGRENADEIMPACT.wav",
        "data/sounds/GRENADEIMPACT.wav",
        "data/sounds/WormLanding.wav",
        "data/sounds/THROWPOWERUP.wav",
        "data/sounds/THROWRELEASE.wav"

     
        
        

    ]

    var nonPriorityAudio = [
      
    ]

    export var images = [];
    export var sounds = [];

    export function getImage(s)
    {
        return images[s];
    }

    export function getSound(s) : Sound
    {
        return sounds[s];
    }

    export function loadImages(sources, callback)
    {

        var images = [];
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for (var src in sources)
        {
            numImages++;
        }
        for (var src in sources)
        {
            var name = sources[src].match("[a-z,A-Z,0-9]+[.]png")[0].replace(".png", "");

            if (images[name] == null)
            {
                images[name] = new Image();
                images[name].onload = function ()
                {
                    Logger.log(" Image " + this.src + " loaded sucessfully ");
                    if (++loadedImages >= numImages)
                    {
                        AssetManager.images = images;
                        callback();
                    }
                };
            } else
            {
                Logger.error("Image " + sources[src] + " has the same name as" + images[name].src);
            }

            images[name].src = sources[src];
        }

    }

    export function addSpritesDefToLoadList()
    {
        // Load all sprites
        for (var sprite in Sprites.worms)
        {
            priorityImages.push(Settings.REMOTE_ASSERT_SERVER + "data/images/" + Sprites.worms[sprite].imageName + ".png");
        }

        for (var sprite in Sprites.weaponIcons)
        {
            priorityImages.push(Settings.REMOTE_ASSERT_SERVER + "data/images/weaponicons/" + Sprites.weaponIcons[sprite].imageName + ".png");
        }

        for (var sprite in Sprites.weapons)
        {
            priorityImages.push(Settings.REMOTE_ASSERT_SERVER + "data/images/" + Sprites.weapons[sprite].imageName + ".png");
        }

        
        for (var sprite in Sprites.particleEffects)
        {
            priorityImages.push(Settings.REMOTE_ASSERT_SERVER + "data/images/" + Sprites.particleEffects[sprite].imageName + ".png");
        }

    }

    export function loadPriorityAssets(callback)
    {
        addSpritesDefToLoadList();
        loadImages(priorityImages, function ()
        {
            loadSounds(priorityAudio, callback);
        });

        loadSounds(nonPriorityAudio, function () { Logger.debug("Non proity audio loaded ") });
    }

    export function loadSounds(sources, callback)
    {
        var bufferLoader = new BufferLoader(Sound.context, sources, function (bufferList)
        {

            for (var i = 0; i < bufferList.length; i++)
            {
                sounds[bufferList[i].name] = new Sound(bufferList[i].buffer);
            }

            callback();
        });
        bufferLoader.load();
    }

}