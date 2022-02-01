import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UserSignUpPage from "./UserSignUpPage";

describe('UserSignUpPage', () => {

    describe('Layout', () => {

        it('has header h1 with sign up', () => {
            //object de-structuring:
            const { container } = render(<UserSignUpPage />);
            const h1 = container.querySelector('h1');
            expect(h1).toBeInTheDocument();
        })

        it('has only 1 h1', () => {
            //object de-structuring:
            const { container } = render(<UserSignUpPage />);
            const allH1s = container.querySelectorAll('h1');
            expect(allH1s.length).toBe(1);
        })

        it('has Input for display name', () => {
            //object de-structuring:
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Display Name/i)
            expect(input).toBeInTheDocument()
        })

        it('has Input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Your username/i)
            expect(input).toBeInTheDocument()
        })

        it('has Input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Your password/i)
            expect(input).toBeInTheDocument()
        })

        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Your password/i)

            expect(input.type).toBe('password')
        })

        it('has submit button', () => {
            const { container } = render(<UserSignUpPage />)
            const btn = container.querySelector('button')
            expect(btn).toBeInTheDocument()
            expect(btn.textContent).toMatch(/Sign Up/i)
        })
    })

    describe('Interactions', () => {
        //helpers:
        const changeEvent = (text) => {
            return {
                target: {
                    value: text
                }
            }
        }

        //mock an async func that returns a resolved promise after 300ms
        const mockAsyncDelayed = (success = true) => {
            return jest.fn().mockImplementation(() => { 
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        success ? resolve({}) : reject('error')
                    }, 300)
                })
            })
        }

        let button, displayNameInput, userNameInput, passwordInput
        const setupForSubmit = (props) => {
            //render the component with all the props
            const rendered = render(<UserSignUpPage {...props} />)
            //spread the rendered object
            const { container, queryByPlaceholderText } = rendered

            //find the inputs by placeholder:
            userNameInput = queryByPlaceholderText(/Your username/i)
            displayNameInput = queryByPlaceholderText(/Your Display Name/i)
            passwordInput = queryByPlaceholderText(/Your password/i)

            //find the button by tag name:
            button = container.querySelector('button')

            //simulate user typing data into the inputs:
            fireEvent.change(userNameInput, changeEvent('my-user-name'))
            fireEvent.change(displayNameInput, changeEvent('my-display-name'))
            fireEvent.change(passwordInput, changeEvent('P4ssword!'))

            return rendered //other tests can acces the 
        }

        it('sets the display name value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/display name/i)
            fireEvent.change(input, changeEvent('my-display-name'))
            expect(input).toHaveValue('my-display-name')
        })

        it('sets the user name value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Your username/i)
            fireEvent.change(input, changeEvent('my-username'))
            expect(input).toHaveValue('my-username')
        })

        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignUpPage />)
            const input = queryByPlaceholderText(/Your password/i)
            fireEvent.change(input, changeEvent('P4assword!'))
            expect(input).toHaveValue('P4assword!')
        })

        it('calls postSignUp when the fields are valid and the actions are provided in props', () => {
            const actions = {
                postSignUp: jest.fn().mockResolvedValueOnce({})
            }

            setupForSubmit({ actions })
            fireEvent.click(button)
            expect(actions.postSignUp).toBeCalledTimes(1)
        })

        it('calls postSignUp with user body when the fields are valid', () => {
            const actions = { postSignUp: jest.fn().mockResolvedValueOnce({}) }

            setupForSubmit({ actions })
            fireEvent.click(button)

            const expectedUser = {
                userName: 'my-user-name',
                displayName: 'my-display-name',
                password: 'P4ssword!'
            }

            expect(actions.postSignUp).toHaveBeenCalledWith(expectedUser)
        })

        it('does not throw an exception when clicking the button and we have no actions in props', () => {
            setupForSubmit()
            expect(() => {
                fireEvent.click(button)
            }).not.toThrow()
        })

        it('disables signup button when there is an ongoing api call', () => {
            const actions = {
                postSignUp: mockAsyncDelayed()
            }
            setupForSubmit({ actions })

            fireEvent.click(button)
            fireEvent.click(button)

            expect(actions.postSignUp).toHaveBeenCalledTimes(1)
        })

        it('shows spinner when there is an ongoing api call', () => {
            const actions = {
                postSignUp: mockAsyncDelayed()
            }
            const { queryByText } = setupForSubmit({ actions })

            fireEvent.click(button)

            const spinner = queryByText(/Loading/i)
            expect(spinner).toBeInTheDocument()
        })

        it('hides spinner when api call is finished successfully', async() => {
            const actions = {
                postSignUp: mockAsyncDelayed()
            }
            const { queryByText } = setupForSubmit({ actions })

            fireEvent.click(button)

            await waitForElementToBeRemoved(()=>queryByText(/Loading/i))
        })

        it('hides spinner when api call fails', async () => {
            const actions = {
                postSignUp: mockAsyncDelayed(false)
            }
            const { queryByText } = setupForSubmit({ actions })

            fireEvent.click(button)

            await waitForElementToBeRemoved(() => queryByText(/Loading/i))
        })
    })
})