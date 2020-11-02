import { camera } from '../camera';

const scene = new THREE.Scene();
scene.visible = false;
scene.add(camera);

export { scene };
