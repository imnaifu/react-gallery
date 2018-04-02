export function updateImg(newImgs){
	return {
		type: 'UPDATE_IMG',
		payload: newImgs,
	}
}

export function updateImgPosition(newPositions){
	return {
		type: 'UPDATE_IMG_POSITIONS',
		payload: newPositions,
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