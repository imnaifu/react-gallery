export function updateImg(newImgs){
	return {
		type: 'UPDATE_IMG',
		payload: newImgs,
	}
}

export function updateImgSize(index, value){
	return {
		type: 'UPDATE_IMG_SIZE',
		index: index,
		payload: value,
	}
}

export function updateCurrentImg(value){
	return {
		type: 'UPDATE_CURRENT_IMG',
		payload: value,
	}
}

export function updateFlipedImg(value){
	return {
		type: 'UPDATE_FLIPED_IMG',
		payload: value,
	}
}