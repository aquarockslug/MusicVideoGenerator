import librosa, threading, json, time, os
from playsound import playsound

projectData = {
    'title': 'Daze',
    'song': 'Daze.mp3',
    'musicDir': 'music/'
}

librosaData = {}

def init():
    projectData['songPath'] = os.path.abspath(os.path.join(
        projectData['musicDir'], projectData['song']))

    if os.path.exists(projectData['title']+'.json'):# load json
        with open(projectData['title']+'.json') as f:
            librosaData = json.loads(f.read())
        print('loaded %s.json' % projectData['title'])
    else:# generate librosa data if no json found
        librosaData['beats'] = getBeats(projectData['songPath'])
        # get onsets
        saveFile(projectData['title'], librosaData)

    start(librosaData)

def start(librosaData):
    threading.Thread(target=timeKeeper, args=(librosaData,)).start()
    threading.Thread(target=playsound, args=(projectData['songPath'],)).start()

def timeKeeper(librosaData):
    beats = librosaData['beats']
    for i in range(len(beats)-1):
        delay = beats[i+1] - beats[i]
        time.sleep(delay)
        beat(i)

def getBeats(path):
    y, sr = librosa.load(path)
    librosaData['tempo'], beat_frames = librosa.beat.beat_track(y=y, sr=sr)
    return librosa.frames_to_time(beat_frames, sr=sr).tolist()

def beat(i):
    print(i)

def saveFile(name, obj, printDebug=False):
    j = json.dumps(obj, indent=4)
    filename = name + ".json"
    f = open(filename, "w")
    f.write(j)
    f.close()
    if printDebug: print(j)

init()