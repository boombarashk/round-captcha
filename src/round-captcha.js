import {MESSAGES} from "./lang.js";
import {randomBoolean, randomizeArrayNumber} from "./randomize.js";

const COUNT_OF_FIGURE = 5
const TIMEOUT = 60000 //1min

const COLORBG = 'black'
const COLORBG_DISABLED = 'white'

let orderDesc = false
let orderKeys = []

export default class RoundCaptcha {
    figures
    config
    container
    count
    counter = 0
    timeout
    scale

    constructor(config = {}){
        this.config = config
        this.count = config.count || COUNT_OF_FIGURE
        this.diameter = config.diameter || 10
        this.timeout = config.timeout || TIMEOUT
        this.scale = config.scale || 1
        this.figures = new Array(this.count)

        this.onClickFigure = this.onClickFigure.bind(this)
        this.onHoverFigure = this.onHoverFigure.bind(this)
        this.onLeaveFigure = this.onLeaveFigure.bind(this)
        this.init()
    }

    init() {
        const {containerClassName} = this.config
        this.container = document.getElementsByClassName(containerClassName)[0]
        if (!containerClassName || !this.container) {
            throw Error(MESSAGES.NOT_FOUND_CONTAINER)
        }

        orderDesc = randomBoolean
        orderKeys = randomizeArrayNumber(this.count)

        this.taskText()

        for (let i=0; i< this.count; i++) {
            this.drawFigure(i)
        }
        const flexContainer = this.createBlock()
        flexContainer.style.display ='flex'
        this.figures.forEach(figure => flexContainer.append(figure))

        this.start()
    }

    createBlock(opts = {}) {
        const block = document.createElement('div')
        const {className = '', height, width, round = false, text = '', addBlock = true} = opts
        block.className = className
        if (height) { block.style.height = height }
        if (round) {
            block.style.width = height
            block.style.borderRadius = '50%'
        } else {
            if (width) { block.style.width = width }
        }
        if (text.length) { block.innerText = text }
        if (addBlock) { this.container.append(block) }

        return block
    }

    drawFigure(index) {
        const height = (orderKeys[index] +1) * this.diameter * this.scale
        const figure = this.createBlock({
            addBlock: false,
            round: true,
            height: `${height}px`,
        })
        figure.style.backgroundColor = this.config.colorBg || COLORBG
        this.figures.push(figure)
    }

    taskText() {
        const orderText = !!orderDesc ? MESSAGES.DESC : MESSAGES.ASC
        this.createBlock({text: `Organizar en orden ${orderText}  de área:`, className: 'root-round-captcha-text'})
    }

    start() {
        //todo timeout
        this.figures.forEach(figure => this.addEvents(figure))
    }
    stop(success = true) {
        this.figures.forEach(figure => this.removeEvents(figure))
        alert(success ? 'OK' : 'NO')
    }

    addEvents(figure) {
        figure.addEventListener('click', this.onClickFigure, false)
        figure.addEventListener('mouseenter', this.onHoverFigure, false)
        figure.addEventListener('mouseleave', this.onLeaveFigure, false)
    }
    removeEvents(figure) {
        figure.removeEventListener('click', this.onClickFigure, false)
        figure.removeEventListener('mouseenter', this.onHoverFigure, false)
        figure.removeEventListener('mouseleave', this.onLeaveFigure, false)
    }

    onClickFigure(e){
        const index = this.getChildIndex(e.target)
        const checkKey = orderDesc ? orderKeys.length - this.counter - 1 : this.counter
        const checkIndex = orderKeys.indexOf(checkKey)

        if (index === checkIndex){
            this.counter += 1

            e.target.style.backgroundColor = this.config.colorDisabled || COLORBG_DISABLED
            if (this.counter === COUNT_OF_FIGURE) {
                this.stop(true)
            } else {
                this.removeEvents(e.target)
            }
        } else {
            this.stop(false)
        }
    }
    onHoverFigure(e){
        const key = this.getChildIndex(e.target)
        if (orderKeys.indexOf(key) && this.config.colorBgHover) {
            e.target.style.backgroundColor = this.config.colorBgHover
        }
    }
    onLeaveFigure(e){
        e.target.style.backgroundColor = this.config.colorBg || COLORBG
    }

    getChildIndex(node) {
        return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
    }
}
