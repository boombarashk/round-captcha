import RoundCaptcha from './../src/round-captcha.js'

import config from './config.json' assert { type: "json" }

window.onload = () => new RoundCaptcha(config)
