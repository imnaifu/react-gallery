export function updateStagePosition(value){
	return {
		type: 'UPDATE_STAGE_POSITION',
		payload: value,
	}
}

export function updateStageSize(value){
	return {
		type: 'UPDATE_STAGE_SIZE',
		payload: value,
	}
}

export function updateCurrentImg(value){
	return {
		type: 'UPDATE_CURRENT_IMG',
		payload: value,
	}
}