import * as dat from 'lil-gui'
// import { lights } from '../script'
import { lights } from './lights'
export const gui = new dat.GUI()

export const parameters = {
    textColor: 0xffffff,
    objectsColor: 0xffffff,
    textSize: 0.5,
    lightDircColor: 0xffffff
}

gui.add(lights.ambLight, 'intensity').min(0).max(3).name("ambient light Intensity")
gui.add(lights.dirctLight, 'intensity', 0, 3).name("directional light intensity")
gui.add(lights.HemiLight.position, 'x', -2, 2).name('X light')
gui.add(lights.HemiLight.position, 'y', -2, 2).name('Y light')
gui.add(lights.HemiLight.position, 'z', -2, 3).name('Z light')


gui.addColor(parameters, 'lightDircColor').onChange(() => {
    lights.dirctLight.color.set(parameters.lightDircColor)
}).name('direct color')
