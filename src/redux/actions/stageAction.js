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
