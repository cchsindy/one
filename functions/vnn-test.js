const CanvasService = require('./services/canvas/CanvasService')
const SparkpostService = require('./services/sparkpost/SparkpostService')
const VnnService = require('./services/vnn/VnnService')

const canvas = new CanvasService()
const sparkpost = new SparkpostService()
const vnn = new VnnService()

vnn.runEligibilityCheck(canvas, sparkpost)
