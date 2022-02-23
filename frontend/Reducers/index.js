import { combineReducers } from 'redux'
import { vuroxUsers } from './users'
import { vuroxCompanyInfo } from './company'
import { vuroxCompanyCalendar } from './calendar'
import { vuroxMail } from './mail'
import { vuroxChatMessages } from './message'
// import sagaUsers from './ducks/users'
// import sagaConfig from './ducks/configs'


const rootReducer = combineReducers({
	users: vuroxUsers,
	company: vuroxCompanyInfo,
	calendar: vuroxCompanyCalendar,
	mail: vuroxMail,
	message: vuroxChatMessages,
	// sagaUsers,
	// sagaConfig,
})
export default rootReducer;