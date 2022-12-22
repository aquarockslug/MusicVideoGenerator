import * as librosa from 'librosa';
import * as playsound from 'playsound';
import * as threading from 'threading';
import * as json from 'json';
import * as time from 'time';
import * as os from 'os';
var librosaData, projectData;
projectData = {
  "title": "Daze",
  "song": "Daze.mp3",
  "musicDir": "music/"
};
librosaData = {};

function init() {
  projectData["songPath"] = os.path.abspath(os.path.join(projectData["musicDir"], projectData["song"]));

  if (os.path.exists(projectData["title"] + ".json")) {
    // f = file
    librosaData = json.loads(f.read());
    console.log("loaded %s.json" % projectData["title"]);
  } else {
    librosaData["beats"] = getBeats(projectData["songPath"]);
    saveFile(projectData["title"], librosaData);
  }

  start(librosaData);
}

function start(librosaData) {
  new threading.Thread({
    "target": timeKeeper,
    "args": [librosaData]
  }).start();
  new threading.Thread({
    "target": playsound,
    "args": [projectData["songPath"]]
  }).start();
}

function timeKeeper(librosaData) {
  var beats, delay;
  beats = librosaData["beats"];

  for (var i = 0, _pj_a = beats.length - 1; i < _pj_a; i += 1) {
    delay = beats[i + 1] - beats[i];
    time.sleep(delay);
    beat(i);
  }
}

function getBeats(path) {
  var beat_frames, sr, y;
  [y, sr] = librosa.load(path);
  [librosaData["tempo"], beat_frames] = librosa.beat.beat_track({
    "y": y,
    "sr": sr
  });
  return librosa.frames_to_time(beat_frames, {
    "sr": sr
  }).tolist();
}

function beat(i) {
  console.log(i);
}

function saveFile(name, obj, printDebug = false) {
  var f, filename, j;
  j = json.dumps(obj, {
    "indent": 4
  });
  filename = name + ".json";
  f = open(filename, "w");
  f.write(j);
  f.close();

  if (printDebug) {
    console.log(j);
  }
}

init();
