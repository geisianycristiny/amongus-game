startReactor = {
    computerCombination: [],
    playerCombination: [],
    computerCombinationPosition: 1,
    combinationMaxPosition: 5,
    memoryMaxCombination: 9,

    audio: {
        start: 'start.mp3',
        fail: 'fail.mp3',
        complete: 'complete.mp3',
        combinations: ['0.mp3', '1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3'],

        loadAudio(filename) {
            const file = './audio/${filename}?cb=${new Date ().getTime()}'
            const audio = new Audio(file)
            audio.load()
            return audio
        },

        loadAudios() {
            
            if (typeof(startReactor.audio.start) == "object") return

            startReactor.audio.start = startReactor.audio.loadAudio(startReactor.audio.start)
            startReactor.audio.complete = startReactor.audio.loadAudio(startReactor.audio.completa)
            startReactor.audio.fail = startReactor.audio.loadAudio(startReactor.audio.fail)
            startReactor.audio.combinations = startReactor.audio.combinations.map((audio) => startReactor.audio.loadAudio(audio))
        }
    },
    interface:{
        memoryPanel: document.querySelector(".painelMemory"),
        computerLedPanel: document.querySelector(".computerLedPanel"),
        playerLedPanel : document.querySelector(".playerLedPanel"),
        playerMemory: document.querySelector(".playerLedPanel"),
        playerMemoryButtons: document.getElementByIdClassName
        ("player_memory"),

        turnLedon(index, ledPanel) {
            ledPanel.childre[index].classList.add("ledOn");
        },

        turnAllLedsOff(){
            const computerLedPanel = startReactor.interface.computerLedPanelconst 
            const playerLedPanel = startReactor.interface.playerLedPanel

            for (var i = 0; i < computerLedPanel.children.length; i++){
               computerLedPanel.children[i].classList.remove("ledOn");
               playerLedPanel.children[i].classList.remove("ledOn");
            }

       },

       async start(){
           return startReactor.audio.start.play()
       },
       playItem(index, combinationPosition, location = 'computer'){
            const leds = (location =='computer') ? startReactor.interface.computerLedPanel : startReactor.interface.playerLedPanel
            const memPanel = startReactor.interface.mamoryPanel.children[index]

            memPanel.classLIst.add("memoryActive")
            startReactor.interface.turnLedOn(combinationPosition, leds)
            startReactor.audio.combinations[index].play().then(()=> {
                setTimeout(() => {
                    memPanel.classList.remove("memoryActive")
                }, 150)
            })
      },

            endGame(type = "fail") {
                const memPanel = startReactor.interface.memoryPanel
                const ledPanel = startReactor.interface.computerLedPanel
                const audio = (type == "complete")? startReactor.audio.
                complete : startReactor.audio.fail
                const typeclasses = (type == "complete") ?
            ["playerMemoryComplete", "playerLedComplete"] :
            ["playerMemoryError", "playerLedError"]

            startReactor.interface.disableBuyyons()
            startReactor.interface.turnAllLedsOff()

            audio.player().then(() => {
                for (var i = 0; i < memPanel.childre.length; i++) {
                    if(memPanel.childre[i].tagName == "DIV")
                        memPanel.childre[i].classLIst.add(typeclasses[0])
                
                } 
                for (var i = 0; i < ledPanel.childre.length; i++) {
                    if (ledPanel.childre[i].tagName == "DIV")
                        ledPanel.childre[i].classLIst.add(typeclasses[1])
                }
                setTimeout(()=> {
                    for (var i = 0; i < memPanel.childre.length; i++) {
                        if(memPanel.childre[i].tagName == "DIV")
                            memPanel.childre[i].classList.remove(typeclasses[0])
                    }
                    for (var i = 0; i < ledPanel.childre.length; i++) {
                        if (ledPanel.childre[i].tagName == "DIV")
                            ledPanel.childre[i].classLIst.remove(typeclasses[1])
                    }
                }, 900);
            })
        },
        enableButtons() {
            const playermemory = startReactor.interface.playerMemory
            playermemory.classLIst.add('playerActive')

            for (var i = 0; i < playermemory.childre.length; i++) {
                if (playermemory.childre[i].tagName == "DIV")
                    playermemory.childre[i].classLIst.add
                ("playerMemoryActive")
            }
        }
    }
}
