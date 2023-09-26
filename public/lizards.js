function startButton() {
	fetch('./beats/Daze.json')
    	.then((response) => response.json())
    	.then((data) => {
        	beats = data.beats.slice(0, 200) // get beats
        	beats = beats.map((beat) => beat * 1000) // convert to milliseconds
        	start(beats)
    	});
}

function start(beats) {
    grid = document.getElementById('grid')
        // up left down right, last first from end
    angles = ['rotate(0deg)', 'rotate(240deg)',
        'rotate(120deg)'
    ]
    for (let i = 0; i < beats.length; i++) {
        var hex = document.createElement('div');
        hex.setAttribute('class', 'hex');
        hex.setAttribute('id', "L" + i);

        // lizard.style.transform = 'translateX('+(i*1)+'px)';
        hex.style.transform = angles[i % angles.length];
        // hex.style.transform = 'rotate(120deg)';
        grid = document.getElementById('grid');
        grid.appendChild(hex);
    }

    playAudio()
    animate()
}

function playAudio() {
    var audio = new Audio('music/Daze.mp3');
    audio.play();
}

function animate() {
    anime({
        targets: '.hex',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        delay: function(el, i) {
            return beats[i]
        },
        // translateX: function(el, i) {
        //      return i%2==0 ? [0, 1000] : [0, -1000]},
        translateX: function(el, i) {
            return [0, -50]
        },
        rotate: 90,
        duration: 500,
        scale: 100,
        opacity: 0,
        direction: 'reverse',
    })
}
