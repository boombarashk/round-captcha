import {MESSAGES} from "./lang.js";
import {randomize} from "./randomize.js";

const COUNT_OF_FIGURE = 5
const TIMEOUT = 60000 //1min

export default class RoundCaptcha {
    config
    containers = []
    count
    counter = 0
    timeout

    constructor(config = {}){
        this.config = config
        this.count = config.count || COUNT_OF_FIGURE
        this.timeout = config.timeout || TIMEOUT
        this.init()
    }

    init() {
        const {containerClassName} = this.config
        this.containers = document.getElementsByClassName(containerClassName)
        if (!containerClassName || this.containers.length === 0) {
            throw Error(MESSAGES.NOT_FOUND_CONTAINER)
        }

        this.start()
    }

    createBlock(opts = {}, parent = this.containers[0]) {
        const block = document.createElement('div')
        const {className = '', height, width, round = false, text = ''} = opts
        block.className = className
        if (height) { block.style.height = height }
        if (round) {
            block.style.width = height
        } else {
            if (width) { block.style.width = width }
        }
        if (text.length) { block.innerText = text }
        parent.append(block)

        return block
    }

    drawFigure() {

    }

    taskText() {
        //todo random asc desc
        const order = MESSAGES.ASC
        this.createBlock({text: `Organizar en orden ${order}  de área:`})
    }

    start() {
        this.taskText()
    }
    stop() {}
}
