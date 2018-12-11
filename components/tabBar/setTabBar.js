import { list } from './config.js'

const setActive = (path) => {
    let _list = list.map(item => {
    	const optionPath = path.split('?')[0]
    	const itemPath = item.path.split('?')[0]
        return Object.assign(item, {
            active: optionPath == itemPath
        })
    })
    return _list
}

export default {
    setActive
}