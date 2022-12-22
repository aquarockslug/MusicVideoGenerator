fetch('./Daze.json')
    .then((response) => response.json())
    .then((data) => {
        beats = data.beats.slice(0,200)// get beats
        beats = beats.map((beat) => beat*1000)// convert to milliseconds
        start(beats)
    });

function start(beats){
    grid = document.getElementById('grid')
    // up left down right
    angles = ['rotate(0deg)', 'rotate(90deg)', 'rotate(180deg)', 'rotate(270deg)']
    for (let i = 0; i < beats.length; i++) {
        var lizard = document.createElement('img');
        lizard.setAttribute('src', 'svg/lizard.svg');
        lizard.setAttribute('class', 'lizard');
        lizard.setAttribute('id', "L"+i);
        //lizard.style.transform = 'translateX('+(i*1)+'px)';
        lizard.style.transform = angles[i%4];
        grid.appendChild(lizard);
    }

    var audio = new Audio('../music/Daze.mp3');
    audio.play();

    anime({
        targets: '.lizard', 
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        delay: function(el, i) {return beats[i]},
        //translateX: function(el, i) {
            //     return i%2==0 ? [0, 1000] : [0, -1000]},
        translateX: function(el, i) {return [0, -50]},
        rotate: 90,
        duration: 500,
        scale: 100,
        opacity: 0,
        direction: 'reverse',
    })

    
}
