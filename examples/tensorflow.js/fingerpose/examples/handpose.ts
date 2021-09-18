import '@tensorflow/tfjs-node'
import {
  Image,
  createCanvas,
}               from 'canvas'
import { FileBox } from 'file-box'

import handpose from '@tensorflow-models/handpose'

async function main() {
  console.info('Loading model...')
  const model = await handpose.load()
  console.info('Loading model... done.')

  const fileBox = FileBox.fromFile(__dirname + '/paper.jpg')
  const dataURL = await fileBox.toDataURL()
  const image = new Image()
  const future = new Promise(resolve => image.onload = resolve)
  image.src = dataURL
  console.info(0)
  await future

  // const imageData = imageToData(image)
  // console.info(imageData.width, imageData.height, imageData)
  // console.info(image)
  console.info(1)
  const predictions = await model.estimateHands(image)
  console.info(2)
  console.log('Predictions:', predictions)
}

export function imageToData (image: Image) {
  const canvas  = createCanvas(image.width, image.height)
  const ctx     = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('getContext found null')
  }

  ctx.drawImage(image, 0, 0, image.width, image.height)
  const imageData = ctx.getImageData(0, 0, image.width, image.height)

  return {
    width: imageData.width,
    height: imageData.height,
    data: Uint32Array.from(imageData.data),
  }
}

main()
  .catch(console.error)
