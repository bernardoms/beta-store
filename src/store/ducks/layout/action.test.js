import { hideMessage, showMessage } from './index'

describe('Layout actions', () => {
    describe('Action types', () => {
        test('should return SHOW_MESSAGE type', () => {
            expect(showMessage.type).toEqual('SHOW_MESSAGE')
        })
        test('should return SHOW_MESSAGE type', () => {
            expect(hideMessage.type).toEqual('HIDE_MESSAGE')
        })
    })
    describe('Action Creators', () => {
        test('should return action creator showMessage', () => {
            expect(showMessage()).toEqual({type: "SHOW_MESSAGE"})
        })
        test('should return action creator hideMessage', () => {
            expect(hideMessage()).toEqual({type: "HIDE_MESSAGE"})
        })
    })
})