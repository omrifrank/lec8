import axios from 'axios'
import * as apiCalls from './apiCalls'
import '@testing-library/jest-dom/extend-expect';
describe('apiCalls', () => {
    describe('signup', () => {
        //test
        it('calls /api/1/users', () => {
            const mockPost = jest.fn()
            //replace the real post method from axios with an empty mock function:
            axios.post = mockPost
            apiCalls.signUp()
            //the 1st param of the 1st call: 
            const param0 = mockPost.mock.calls[0][0]
            expect(param0).toBe('/api/1/users')
        })
    })
})
