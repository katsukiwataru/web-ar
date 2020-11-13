import { perspectiveCamera } from '../camera';
import { group } from '../group';

const scene = new THREE.Scene();
scene.add(perspectiveCamera);
scene.add(group);

export { scene };
