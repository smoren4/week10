import * as THREE from 'three';

export function getFirstObjectWithName(event, window, camera, scene, name){
    
    const raycaster = new THREE.Raycaster();
    const getFirstValue = true;

    const mousePointer = getMouseVector2(event, window);
	const intersections = checkRayIntersections(mousePointer, camera, raycaster, scene, getFirstValue);
	const objectList = getObjectsByName(intersections, name);

    if(typeof objectList[0] !== 'undefined'){
        return objectList[0]
    }
    
    return null;
}

export function getMouseVector2(event, window){
    let mousePointer = new THREE.Vector2()

    mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    return mousePointer;
}

export function checkRayIntersections(mousePointer, camera, raycaster, scene) {
    raycaster.setFromCamera(mousePointer, camera);

    let intersections = raycaster.intersectObjects(scene.children, true);
    console.log(intersections);
    return intersections;
}

export function getObjectsByName(objectList, name){
    const objectObjects = [];
    
    objectList.forEach((object) => {
        const objectName = object.object.name || "Unnamed Object";
        objectName.includes(name) ? objectObjects.push(object.object) : null;
    });
    // console.log(objectObjects);
    return objectObjects;
}
