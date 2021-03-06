import * as _ from 'lodash';

const imgReducer = (state=[], action) => {
	//do not modify state directly, or it will not able to 'time travel'
	let stateClone = _.cloneDeep(state);
	switch (action.type) {
		case 'UPDATE_IMG':
			stateClone = action.payload;
			break;
		
		case 'UPDATE_IMG_SIZE':
			stateClone[action.index]['size'] = action.payload;		
			break;

		case 'UPDATE_CURRENT_IMG':
			stateClone.forEach((each, index) => {
				if (index === action.payload){
					//center
					stateClone[index]['centered'] = true;
				}else{
					//not center
					stateClone[index]['centered'] = false;					
					stateClone[index]['fliped'] = false;					
				}
			});
			break;	

		case 'UPDATE_FLIPED_IMG':
			stateClone[action.payload]['fliped'] = !stateClone[action.payload]['fliped'];
			break;	
		
		default:
			break;
	}
	return stateClone;
}

export default imgReducer;	


/*
state = [
	{
		id: 0,
		name: '1.jpg',
		path: './something/1.jpg',
		title: 'title here ',
		description: 'description here'
		fliped: false,
		centered: false;
		// position: {
		// 	left: 10,
		// 	top: 200,
		// 	degree: 20, //transform: rotate(20deg)
		// },	
		size: {
			width: 0,
			height: 0
		}
	},
]
*/
