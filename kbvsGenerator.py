import os, json

def main():
    # dir = os.cwd
    dir = "C:/Users/zachl/Desktop/MusicVideoGenerator/images/"

    # read filenames from dir
    filenames = ["1.jpg", "2.jpg", "3.jpg"]
    
    # create slideshow object
    slideshow = {
        "config": config(),
        "slides": slides(dir, filenames),
        "music": music()
    }

    # save slideshow to json file
    saveFile("generated", slideshow, True)
    
def saveFile(name, slideshow, printDebug=False):
    j = json.dumps(slideshow, indent=4)
    filename = name + ".json"
    f = open(filename, "w")
    f.write(j)
    f.close()
    if printDebug: print(j)

def slides(dir, filenames):
    slides = []
    for filename in filenames:
        path = os.path.join(dir, filename)
        slide = {"file": path}
        slides.append(slide)
    return slides

def music():
    return ["path1"]

def config():
    return {
        "output_width": 1920,
        "output_height": 1080,
        "slide_duration": 3,
        "slide_duration_min": 1,
        "fade_duration": 1.0,
        "transition": "random",
        "transition_bars_count": 10,
        "transition_cell_size": 100,
        "fps": 60,
        "zoom_rate": 0.1,
        "zoom_direction_x": "random",
        "zoom_direction_y": "random",
        "zoom_direction_z": "random",
        "scale_mode": "auto",
        "loopable": False,
        "overwrite": False,
        "generate_temp": False,
        "delete_temp": False,
        "sync_to_audio": False,
        "sync_titles_to_slides": False,
        "is_synced_to_audio": False
    }

main()