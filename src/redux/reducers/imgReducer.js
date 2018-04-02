const imgReducer = (state=[], action) => {
	//do not modify state directly, or it will not able to 'time travel'
	switch (action.type) {
		case 'UPDATE_IMG':
			state = action.payload;
			break;

		case 'UPDATE_IMG_POSITIONS':
			state = state.map((each, index) => {
				each.position = action.payload[index];
				return each; 
			});
			break;
		
		case 'UPDATE_IMG_SIZE':
			state[action.index]['size'] = action.payload;		
			break;

		case 'UPDATE_CURRENT_IMG':
			state[actiton.payload]['centered'] = true;
			break;	

		default:
			break;
	}
	return state;
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
		position: {
			left: 10,
			top: 200,
			degree: 20, //transform: rotate(20deg)
		},	
		size: {
			width: 0,
			height: 0
		}
	},
]
*/
