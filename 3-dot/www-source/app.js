// locate target for animating
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var p3 = document.getElementById('p3');

// create timelines
tl1 = new TimelineMax({ paused:true });
tl2 = new TimelineMax({ paused:true });
tl3 = new TimelineMax({ paused:true });

/*
    CUSTOMIZE
*/
var bottom_margin = 50;
var top_margin = 50;
var amp_scale_factor = 20;

/*
    DYNAMICALLY CALCULATE PROPER VALUES
*/

// Get the screen size
var screen_height = window.innerHeight;        // controls
var screen_width = window.innerWidth;

// Find maximum and minimum frequency
for( var i = 0; i < dataset.length; i++ ) {
    var o = parseFloat(dataset[i].f);
    if(i==0) {
      var max_freq = o;
      var min_freq = o;
    }

    if( Number(o) > max_freq ) max_freq = o;
    if( Number(o) < min_freq ) min_freq = o;
}

// Find maximum and minimum amplitude

for( var i = 0; i < dataset.length; i++ ) {
  var o = parseFloat(dataset[i].a);
    if(i==0) {
      var max_amp = o;
      var min_amp = o;
    }
    if( o > max_amp ) max_amp = o;
    if( o < min_amp ) min_amp = o;
}

// Normalize amplitude by dividing with max_amp
for( var i = 0; i < dataset.length; i++ ) {
    dataset[i].a = map(dataset[i].a, min_amp, max_amp, 7, 50)
    dataset[i].f = map(dataset[i].f ,min_freq, max_freq, 50, screen_height-150);
    }

// calculate duration
var duration = music_duration / dataset.length;
/*
    ANIMATION
*/
// get trace value from textbox
var x = document.getElementById('seekTo').value;
x = Math.floor(x);
console.log("x is ", x);
for (var i = 0; i < dataset.length - x; i++ ) {
    var h1 = Math.floor(x/2);
    tl1.to(p1, duration, {
        bottom: dataset[i].f,
        width: dataset[i].a ,
        height: dataset[i].a ,
        borderRadius: dataset[i].a  / 2
    });
    tl2.to(p2, duration, {
        bottom: dataset[i+h1].f,
        width: dataset[i+h1].a ,
        height: dataset[i+h1].a ,
        borderRadius: dataset[i+h1].a / 2
    });
    tl3.to(p3, duration, {
        bottom: dataset[i+x].f ,
        width: dataset[i+x].a ,
        height: dataset[i+x].a ,
        borderRadius: dataset[i+x].a / 2
    });




}

// Fade out all the dots
tl1.to(p1, 2, { opacity: 0, bottom: 0 });
tl2.to(p2, 2, { opacity: 0, bottom: 0 });
tl3.to(p3, 2, { opacity: 0, bottom: 0 });

/*
    AUDIO
*/
// Initialize Howl with music file
var audio = new Howl({
  urls: ['music.wav']
});

/*
    START AND STOP CONTROL
*/

function start() {
    tl1.play();
    tl2.play();
    tl3.play();

    audio.play();
}

function stop() {
    tl1.pause();    tl1.seek(0);
    tl2.pause();    tl2.seek(0);
    tl3.pause();    tl3.seek(0);
    audio.stop();
}

function map( x, in_min, in_max, out_min, out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
