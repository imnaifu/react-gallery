import * as _ from 'lodash';
let imgPositionInfo = [];

const stageReducer = (state=imgPositionInfo, action) => {
	//do not modify state directly, or it will not able to 'time travel'
	let stateClone = _.cloneDeep(state);
	switch (action.type) {
		case 'UPDATE_IMG_POSITIONS':
			// stateClone = action.payload;
			break;

		default:
			break;
	}

	//must return new state here
	return stateClone;
}

export default stageReducer;	


