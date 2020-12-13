import reducer from './index'

describe('Layout Reducer', () => {
    test('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({showMessage: false})
    })

    test('should return state with show message true', () => {
        expect(reducer(undefined, {type: 'SHOW_MESSAGE'})).toEqual({showMessage: true})
    })

    test('should return state with show message true', () => {
        expect(reducer({showMessage: true}, {type: 'HIDE_MESSAGE'})).toEqual({showMessage: false})
    })

})