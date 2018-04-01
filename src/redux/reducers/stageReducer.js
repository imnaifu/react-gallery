let defaultStage = {
	leftSide: {
		left: {
			start: 0, //左侧水平方向最小值
			end: 0, //左侧水平方向最大值
		},
		top: {
			start: 0, //左侧垂直方向最小值
			end: 0, //左侧垂直方向最大值
		}
	},
	rightSide: {
		left: {
			start: 0, //右侧水平方向最小值
			end: 0, //右侧水平方向最大值
		},
		top: {
			start: 0, //右侧垂直方向最小值
			end: 0, //右侧垂直方向最大值
		}		
	},
	center: {
		left: 0, //中间水平方向值
		top: 0, //中间垂直方向值
	},
	// stageSize: {
	// 	//gallery size
	// 	scrollWidth: 0,
	// 	scrollHeight: 0,
	// },
	currentImgIndex: 0
};

const stageReducer = (state=defaultStage, action) => {
	//do not modify state directly, or it will not able to 'time travel'

	switch (action.type) {
		case 'UPDATE_STAGE_POSITION':
			state = {
				...state,			
				leftSide: action.payload.leftSide,
				rightSide: action.payload.rightSide,
				center: action.payload.center				
			};
			break;

		// case 'UPDATE_STAGE_SIZE':
		// 	state = Object.assign(
		// 		state, 
		// 		{				
		// 			stageSize: action.payload,
		// 		}
		// 	);
		// 	break;

		case 'UPDATE_CURRENT_IMG':
			state = {
					...state,				
					currentImgIndex: action.payload,
				};
			break;

		default:
			break;
	}

	//must return new state here
	return state;
}

export default stageReducer;	


